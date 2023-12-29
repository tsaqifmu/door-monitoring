import * as z from "zod";

export const formAddAgentSchema = z.object({
  agentName: z
    .string({ required_error: "Nama agent tidak boleh kosong" })
    .min(1, "Masukkan nama agent"),
  agentPhoneNumber: z
    .string({ required_error: "No hp agent tidak boleh kosong" })
    .min(1, "Masukkan no hp agent"),
  agentRfid: z
    .string({ required_error: "No rfid agent tidak boleh kosong" })
    .min(1, "Masukkan no RFID agent"),
});
export const formAddDoorSchema = z.object({
  doorNumber: z
    .string({ required_error: "Nomor pintu tidak boleh kosong" })
    .min(1, "Masukkan nomor pintu"),
});
