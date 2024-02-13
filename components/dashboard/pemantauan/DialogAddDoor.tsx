import { useState } from "react";

import { Download, Plus } from "lucide-react";

import FormAddDoor from "./FormAddDoor";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { generateFileContent } from "@/lib/generateFileContent";

const DialogAddDoor = ({ refetchDoors }: any) => {
  const [addDoorOpen, setAddDoorOpen] = useState(false);
  const [fileContent, setFileContent] = useState("");
  const [doorNumber, setDoorNumber] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const handleDownload = () => {
    const blob = new Blob([fileContent], { type: "text/plain" });
    const fileUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.style.display = "none";
    downloadLink.setAttribute("download", `File Pintu ${doorNumber}.ino`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleDataSubmit = (data: any) => {
    setDoorNumber(data.doorNumber);
    const newFileContent = generateFileContent(data.doorNumber);
    setFileContent(newFileContent);
  };
  return (
    <Dialog open={addDoorOpen} onOpenChange={setAddDoorOpen}>
      <DialogTrigger asChild className="mt-4">
        <Button
          variant="default"
          size={"sm"}
          className="gap-x-2 text-xs font-semibold"
        >
          <Plus size={16} strokeWidth={2.5} />
          Tambah Pintu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <FormAddDoor
          setAddDoorOpen={setAddDoorOpen}
          refetchDoors={refetchDoors}
          onDataSubmit={handleDataSubmit}
          setButtonDisabled={setButtonDisabled}
        />
        <Button
          disabled={buttonDisabled}
          variant="default"
          size={"sm"}
          onClick={handleDownload}
          className="mt-5 gap-x-2 bg-green-500 text-xs font-semibold hover:bg-green-500/70"
        >
          <Download size={16} strokeWidth={2.5} />
          Download File Ino
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddDoor;
