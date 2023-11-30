"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { formLoginSchema } from "@/lib/validationSchema";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { useToast } from "../ui/use-toast";

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formLoginSchema>) => {
    setIsSubmitting(true);
    const payload = {
      email: values.email,
      password: values.password,
    };

    try {
      const { data } = await axiosInstance.post("/auth/signin", payload);

      localStorage.setItem("accessToken", data.data.accessToken);
      router.push("/dashboard");
    } catch (e) {
      const error = e as AxiosError;
      const responseData: { message?: string } = error.response?.data || {};

      if (responseData.message === "User not found") {
        toast({
          variant: "destructive",
          title: "Akun tidak ditemukan",
          description: "Isi email dan password dengan benar",
        });
        form.reset({ email: "", password: "" });
      } else if (responseData.message === "Incorrect password") {
        toast({
          variant: "destructive",
          title: "Password yang anda masukkan salah",
          description: "Masukkan dengan password dengan benar",
        });
        form.reset({ email: values.email, password: "" });
      } else {
        console.log(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat Email</FormLabel>
              <FormControl>
                <div className="py-2">
                  <Input placeholder="Masukkan email" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kata sandi</FormLabel>
                <FormControl>
                  <div className="relative py-2">
                    <Input
                      placeholder="Masukkan kata sandi"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <Button
                      variant="ghost"
                      type="button"
                      className="absolute right-0 top-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="text-gray-400" />
                      ) : (
                        <Eye className="text-gray-400" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="my-16 w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Tunggu sebentar...
            </>
          ) : (
            "Masuk"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FormLogin;
