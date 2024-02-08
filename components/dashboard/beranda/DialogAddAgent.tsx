import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FormAddAgent from "@/components/dashboard/beranda/FormAddAgent";

const DialogAddAgent = ({ refetchAgents }: any) => {
  const [addAgentDialogOpen, setAddAgentDialogOpen] = useState(false);

  console.log("name", name);
  return (
    <Dialog open={addAgentDialogOpen} onOpenChange={setAddAgentDialogOpen}>
      <DialogTrigger asChild className="mt-4">
        <Button
          variant="default"
          size={"sm"}
          className="gap-x-2 text-xs font-semibold"
        >
          <Plus size={16} strokeWidth={2.5} />
          Tambah Agent
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <FormAddAgent
          setAddAgentOpen={setAddAgentDialogOpen}
          refetchAgents={refetchAgents}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddAgent;
