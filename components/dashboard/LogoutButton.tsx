import Link from "next/link";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const LogoutButton = () => {
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Link
          href="#"
          className=" group flex w-full cursor-pointer justify-start rounded-lg p-3 text-base font-normal text-gray-900 transition hover:bg-red-500  hover:font-semibold hover:text-white "
        >
          <div className="flex flex-1 items-center">
            <LogOut strokeWidth={2.25} className="mr-9 h-5 w-5" />
            Keluar
          </div>
        </Link>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin untuk keluar?</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              localStorage.removeItem("accessToken");
              router.push("/");
            }}
          >
            Keluar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutButton;
