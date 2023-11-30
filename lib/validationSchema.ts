import * as z from "zod";

export const formLoginSchema = z.object({
  email: z
    .string({ required_error: "Email tidak boleh kosong" })
    .min(1, "Masukkan email")
    .email("Format email salah"),
  password: z
    .string({ required_error: "Password tidak boleh kosong" })
    .min(1, "Masukkan password")
    .min(8, "Password harus 8 karakter"),
});
