import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axiosInstance from "@/lib/axiosInstance";
import { use, useEffect, useState } from "react";
import io from "socket.io-client";

const SwitchDoor = ({ row }: any) => {
  const rowData: any = row.original;
  const [status, setStatus] = useState(rowData.statusBool);
  const [doorNumber, setDoorNumber] = useState(rowData.doorNumber);

  const sendToggle = async (data: any) => {
    console.log("data", rowData);
    const dataBool = data ? 1 : 0;
    try {
      const dataStatus: any = await axiosInstance.post(
        `/command/toggle-door-status?doorNumber=${rowData.doorNumber}&status=open&statusBool=${dataBool}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      return dataStatus;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const socket = io("http://s1.azizfath.com:3000", {
      transports: ["websocket"],
    });

    socket.on("connect_error", (err) => console.log(err));
    socket.on("connect_failed", (err) => console.log(err));
    socket.on("disconnect", (err) => console.log(err));

    socket.on("toggle", (toggle) => {
      if (doorNumber === toggle.doorNumber) {
        console.log("toggle", toggle);
        setStatus(toggle.statusBool);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [status]);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        // id="airplane-mode"
        checked={status}
        onCheckedChange={(data) => sendToggle(data)}
      />
      {/* <Label htmlFor="airplane-mode">ON</Label> */}
    </div>
  );
};

export default SwitchDoor;
