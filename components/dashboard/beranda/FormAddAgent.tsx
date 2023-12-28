"use client";

import * as z from "zod";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axiosInstance from "@/lib/axiosInstance";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import CustomButton from "@/components/CustomButton";
import { formAddMicroorganismSchema } from "@/lib/validation";

const FormAddAgent = ({ setAddAgentOpen }: any) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formAddMicroorganismSchema>>({
    resolver: zodResolver(formAddMicroorganismSchema),
  });
  const onSubmit = async (
    values: z.infer<typeof formAddMicroorganismSchema>,
  ) => {
    setIsSubmitting(true);

    const payload = {
      name: values.agentName,
      noHp: values.agentPhoneNumber,
      rfid: values.agentRfid,
    };

    try {
      const accessToken = localStorage.getItem("accessToken");
      const { data } = await axiosInstance.post(
        "/admin/create-agent",
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      // updateDataAgents();
      toast({
        title: data.message,
        description: "Agent berhasil ditambahkan",
      });
    } catch (error: any) {
      // handleArrayError(error, toast);
    } finally {
      setIsSubmitting(false);
      setAddAgentOpen(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 lg:w-full"
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

          <CustomButton isSubmitting={isSubmitting}>
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
