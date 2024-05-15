import React from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const PasswordInput = ({
  control,
  showPassword,
  setShowPassword,
}: {
  control: any;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}) => {
  return (
    <FormField
      control={control}
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
  );
};

export default PasswordInput;
