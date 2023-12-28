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
import { formAddDoorSchema } from "@/lib/validation";

const FormAddDoor = ({ setAddDoorOpen }: any) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formAddDoorSchema>>({
    resolver: zodResolver(formAddDoorSchema),
  });
  const onSubmit = async (values: z.infer<typeof formAddDoorSchema>) => {
    setIsSubmitting(true);

    const payload = {
      doorNumber: values.doorNumber,
    };

    try {
      const accessToken = localStorage.getItem("accessToken");
      const { data } = await axiosInstance.post(
        "/command/register-door",
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      toast({
        title: data.message,
        description: "Agent berhasil ditambahkan",
      });
    } catch (error: any) {
      // handleArrayError(error, toast);
    } finally {
      setIsSubmitting(false);
      setAddDoorOpen(false);
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
            name="doorNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Pintu</FormLabel>
                <FormControl>
                  <div className="py-2">
                    <Input placeholder="Contoh: 5.4.1" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CustomButton isSubmitting={isSubmitting}>
            <>
              <Plus size={16} strokeWidth={2.5} />
              Tambah Pintu
            </>
          </CustomButton>
        </form>
      </Form>
    </div>
  );
};

export default FormAddDoor;
