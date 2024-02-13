"use client";

import * as z from "zod";
import { Download, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAddDoor } from "@/lib/useAddDoor";
import { formAddDoorSchema } from "@/lib/validation";

import { Input } from "@/components/ui/input";
import CustomButton from "@/components/CustomButton";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { handleArrayError } from "@/lib/handlleAxiosError";

const FormAddDoor = ({
  refetchDoors,
  onDataSubmit,
  setButtonDisabled,
}: any) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formAddDoorSchema>>({
    resolver: zodResolver(formAddDoorSchema),
  });
  const onSubmit = async (values: z.infer<typeof formAddDoorSchema>) => {
    const payload = {
      doorNumber: values.doorNumber,
    };
    // Panggil fungsi callback onDataSubmit dan teruskan payload
    onDataSubmit(payload);

    mutate(payload);
  };
  const { mutate, isPending } = useAddDoor({
    onSuccess: (data: any) => {
      toast({
        title: data.message,
        description: "Pintu berhasil ditambahkan",
      });
      // setAddDoorOpen(false);
      setButtonDisabled(false);
      refetchDoors();
    },
    onError: (error: any) => {
      handleArrayError(error, toast);
    },
  });

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
                    <Input disabled placeholder="Contoh: 5.4.1" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex">
            <CustomButton isSubmitting={isPending}>
              <>
                <Plus size={16} strokeWidth={2.5} />
                Tambah Pintu
              </>
            </CustomButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormAddDoor;
