import React from "react";

import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const EmailInput = ({ control }: { control: any }) => {
  return (
    <FormField
      control={control}
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
  );
};

export default EmailInput;
