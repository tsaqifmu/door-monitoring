import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { formLoginSchema } from "@/lib/validationSchema";

import { getUser } from "@/lib/getUserAPI";
import { handleError } from "@/lib/handlleAxiosError";

export const checkUser = async (
  router: ReturnType<typeof useRouter>,
  setIsSuccess: (value: boolean) => void,
) => {
  const { error } = await getUser();

  if (!error) {
    router.push("/beranda");
    return;
  }

  setIsSuccess(true);
};

export const handleSubmitError = (
  error: any,
  reset: (values?: Partial<z.infer<typeof formLoginSchema>>) => void,
  values: z.infer<typeof formLoginSchema>,
  toast: ReturnType<typeof useToast>["toast"],
) => {
  const responseData: { message?: string } = error.response?.data || {};

  switch (responseData.message) {
    case "User not found":
      toast({
        variant: "destructive",
        title: "Akun tidak ditemukan",
        description: "Isi email dan password dengan benar",
      });
      reset({ email: "", password: "" });
      break;

    case "Incorrect password":
      toast({
        variant: "destructive",
        title: "Password yang anda masukkan salah",
        description: "Masukkan dengan password dengan benar",
      });
      reset({ email: values.email, password: "" });
      break;

    default:
      handleError(error, toast);
      break;
  }
};
