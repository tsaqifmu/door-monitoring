"use client";

import * as z from "zod";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { zodResolver } from "@hookform/resolvers/zod";

import axiosInstance from "@/lib/axiosInstance";
import { formLoginSchema } from "@/lib/validationSchema";
import { checkUser, handleSubmitError } from "@/lib/useAuth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import EmailInput from "@/components/auth/EmailInput";
import PasswordInput from "@/components/auth/PasswordInput";

const FormLogin = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
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

  useEffect(() => {
    (async () => {
      checkUser(router, setIsSuccess);
    })();
  }, [router]);

  const onSubmit = async (values: z.infer<typeof formLoginSchema>) => {
    setIsSubmitting(true);
    const payload = {
      email: values.email,
      password: values.password,
    };

    try {
      const { data } = await axiosInstance.post("/auth/signin", payload);
      localStorage.setItem("accessToken", data.data.accessToken);
      router.push("/beranda");
    } catch (error) {
      handleSubmitError(error as AxiosError, form.reset, values, toast);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSuccess) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center">
        <SyncLoader color="#a436d6" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <EmailInput control={form.control} />
        <div className="mt-4">
          <PasswordInput
            control={form.control}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
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
