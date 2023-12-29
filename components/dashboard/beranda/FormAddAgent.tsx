"use client";

import * as z from "zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import axiosInstance from "@/lib/axiosInstance";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import CustomButton from "@/components/CustomButton";
import { formAddAgentSchema } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAddAgent } from "@/lib/useAddAgent";

const FormAddAgent = ({ setAddAgentOpen, refetchAgents }: any) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formAddAgentSchema>>({
    resolver: zodResolver(formAddAgentSchema),
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
                        <Input placeholder="Contoh: 36775" {...field} />
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
