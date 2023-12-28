import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type CustomButtonProps = ButtonProps & {
  isSubmitting: boolean;
  children: React.ReactNode;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  isSubmitting,
  children,
  ...props
}) => (
  <Button
    size="sm"
    className="mt-5 flex w-full gap-x-2 text-xs font-semibold md:w-fit "
    type="submit"
    disabled={isSubmitting}
    {...props}
  >
    {isSubmitting ? (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Tunggu sebentar...
      </>
    ) : (
      children
    )}
  </Button>
);
export default CustomButton;
