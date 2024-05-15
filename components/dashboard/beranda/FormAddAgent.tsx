"use client";

import mqtt from "mqtt";
import * as z from "zod";
import { useEffect } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAddAgent } from "@/lib/useAddAgent";
import { formAddAgentSchema } from "@/lib/validation";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import CustomButton from "@/components/CustomButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { handleArrayError, handleError } from "@/lib/handlleAxiosError";

const FormAddAgent = ({ setAddAgentOpen, refetchAgents }: any) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formAddAgentSchema>>({
    resolver: zodResolver(formAddAgentSchema),
  });

  useEffect(() => {
    const client = mqtt.connect("ws://s1.azizfath.com:1884", {
      username: "aziz",
      password: "mqtt",
    });
    client.on("connect", () => {
      client.subscribe("rfid");
    });

    client.on("message", (topic, message) => {
      form.setValue("agentRfid", message.toString());
    });
  });

  const onSubmit = async (values: z.infer<typeof formAddAgentSchema>) => {
    const payload = {
      name: values.agentName,
      noHp: values.agentPhoneNumber,
      rfid: values.agentRfid,
    };
    mutate(payload);
  };

  const { mutate, isPending } = useAddAgent({
    onSuccess: (data: any) => {
      toast({
        title: data.message,
        description: "Agent berhasil ditambahkan",
      });
      setAddAgentOpen(false);
      refetchAgents();
    },
    onError: (error: any) => {
      handleArrayError(error, toast);
      // handleError(error, toast);
    },
  });

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 lg:w-full "
        >
          <FormField
            control={form.control}
            name="agentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Agent</FormLabel>
                <FormControl>
                  <div className="py-2">
                    <Input placeholder="Contoh: Fulan" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="items-start gap-x-3 md:flex">
            <div className="mt-4 md:mt-0 md:flex-1">
              <FormField
                control={form.control}
                name="agentPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No handphone akun</FormLabel>
                    <FormControl>
                      <div className="py-2">
                        <Input placeholder="Contoh: 081111111111" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4 md:mt-0 md:flex-1">
              <FormField
                control={form.control}
                name="agentRfid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No RFID</FormLabel>
                    <FormControl>
                      <div className="py-2">
                        <Input
                          {...field}
                          disabled={true}
                          placeholder="Langsung Scan"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <CustomButton isSubmitting={isPending}>
            <>
              <Plus size={16} strokeWidth={2.5} />
              Tambah Agent
            </>
          </CustomButton>
        </form>
      </Form>
    </div>
  );
};

export default FormAddAgent;
