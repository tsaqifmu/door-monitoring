import { useState } from "react";
import { Download, Plus } from "lucide-react";

import FormAddDoor from "./FormAddDoor";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ShortUniqueId from "short-unique-id";

const DialogAddDoor = ({ refetchDoors }: any) => {
  const { randomUUID } = new ShortUniqueId({ length: 10 });

  const [addDoorOpen, setAddDoorOpen] = useState(false);
  const [fileContent, setFileContent] = useState("");
  const [doorNumber, setDoorNumber] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const handleDownload = () => {
    // Membuat blob dari konten file
    const blob = new Blob([fileContent], { type: "text/plain" });

    // Membuat objek URL untuk blob
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
    const newFileContent = `#include <SPI.h>
    #include <Ethernet.h>
    #include <PubSubClient.h>
    #include <ArduinoJson.h>
    #include <Wire.h>
    
    #define RFID Serial2
    #define RXD2 16
    #define TXD2 14
    #define relay1 27
    #define button1 25
    
    byte mac[] = {0x02, 0xAD, 0xBB, 0xCD, 0xDE, 0x01};
    EthernetClient client;
    PubSubClient mqttClient(client);
    
    //ALL MQTT VARIABLE
    const char * mqtt_server = "s1.azizfath.com";
    const int mqtt_port = 1883;
    const char * mqtt_user = "aziz";
    const char * mqtt_pass = "mqtt";
    const char * deviceId = "${randomUUID()}";
    const char * doorNumber = "${data.doorNumber}";
    const char * auth_topic = "auth";
    const char * door_topic = "auth/5.4.1";
    
    //millis var
    long millis1 = 0;
    
    // STATIC IP
    // #define MYIPADDR 10,1,1,129
    // #define MYIPMASK 255,255,255,0
    // #define MYGW 10,1,1,1
    // #define MYDNS 10,1,1,1
    
    StaticJsonDocument<200> doc1;
    StaticJsonDocument<200> doc2;
    
    char c;
    String rfid_tag;
    String masterCardNumber = "310059E5A825";
    
    int latestConditionInt;
    String targetStatus;
    int targetStatusInt;
    
    void setup() {
      pinMode(relay1,OUTPUT);
      pinMode(button1,INPUT_PULLUP);
    
      Serial.begin(9600);
      while (!Serial) continue;
    
      Serial.println("Begin Ethernet");
      Ethernet.init(5); //W5500 CS PIN
    
      if (Ethernet.begin(mac)){
        Serial.println("DHCP OK!");
      } else {
        // Serial.println("Failed to configure Ethernet using DHCP");
        if (Ethernet.hardwareStatus() == EthernetNoHardware) {
          Serial.println("Ethernet shield was not found.  Sorry, can't run without hardware. :(");
          while (true) continue;
        }
        if (Ethernet.linkStatus() == LinkOFF) {
          Serial.println("Ethernet cable is not connected.");
          while (true) continue;
        }
      }
    
      //STATIC
      // IPAddress ip(MYIPADDR);
      // IPAddress dns(MYDNS);
      // IPAddress gw(MYGW);
      // IPAddress sn(MYIPMASK);
      // Ethernet.begin(mac, ip, dns, gw, sn);
    
      delay(1000);
    
      Serial.print("Local IP : ");
      Serial.println(Ethernet.localIP());
      Serial.print("Subnet Mask : ");
      Serial.println(Ethernet.subnetMask());
      Serial.print("Gateway IP : ");
      Serial.println(Ethernet.gatewayIP());
      Serial.print("DNS Server : ");
      Serial.println(Ethernet.dnsServerIP());
      Serial.println("Ethernet Successfully Initialized");
    
      mqttClient.setServer(mqtt_server, mqtt_port);
      mqttClient.setCallback(mqttCallback);
      RFID.begin(9600);
    }
    
    void mqttReconnect() {
      while (!mqttClient.connected()) {
      Serial.println("MQTT connection ...");
        if (mqttClient.connect(deviceId, mqtt_user, mqtt_pass)) {
          Serial.println("MQTT Connected");
          mqttClient.subscribe(door_topic);
        } else {
          Serial.print("failed, rc= ");
          Serial.print(mqttClient.state());
          Serial.print(" try again in 5 seconds");
          delay(5000);
        }
      }
    }
    
    void mqttCallback(char * topic, byte * payload, unsigned int length) {
      if (String(topic) == door_topic) {
        deserializeJson(doc1, payload, length);
        
        // Serial.println("pretty here:");
        // serializeJsonPretty(doc1, Serial);
        // Serial.println();
        int authStatus = doc1["authStatus"];
        String targetStatus = doc1["targetStatusBool"];
        int targetStatusInt = targetStatus.toInt();
    
        if(authStatus == 1) {
          digitalWrite(relay1,targetStatusInt);
          latestConditionInt=digitalRead(relay1);
        }
    
      }
    
    }
    
    void loop() {
      if (!mqttClient.connected()) {
        mqttReconnect();
      }
      mqttClient.loop();
    
      long now1 = millis();
      if (now1 - millis1 > 250) {
        millis1 = now1;
        program();
      }
      
      while (RFID.available() > 0) {
        delay(5);
        c = RFID.read();
        rfid_tag += c;
      }
    
      if (rfid_tag.length() > 20) check();
      rfid_tag = "";
  
    }
    
    void program(){ 
      if (digitalRead(button1)==0){
        if (latestConditionInt==0){
          digitalWrite(relay1,1);
        } else if (latestConditionInt==1){
          digitalWrite(relay1,0);
        } 
        latestConditionInt=digitalRead(relay1);
      }
    
      if(digitalRead(relay1)==0){
        latestConditionInt=0;
        targetStatus="Open";
        targetStatusInt=1;
        
      } else if(digitalRead(relay1==1)){
        latestConditionInt=1;
        targetStatus="Close";
        targetStatusInt=0;
      }
    }
    
    String last_tag;
    
    void check()
    {
      rfid_tag = rfid_tag.substring(1, 13);
      if (rfid_tag==last_tag) {
        Serial.println("same tag");
        last_tag="";
        RFID.flush();
        RFID.begin(9600);
        return;
        
      }
      
      last_tag=rfid_tag;
      Serial.println("Card ID : " + rfid_tag);
      // Serial.println("Access ID : " + masterCardNumber);
    
      doc2["rfid"]=rfid_tag;
      doc2["doorNumber"]=doorNumber;
      doc2["deviceId"]=deviceId;
      doc2["targetStatus"]=targetStatus;
      doc2["targetStatusBool"]=String(targetStatusInt);
    
      String jsonString;
      serializeJson(doc2,jsonString);
    
      // mqttClient.publish(auth_topic, (char * ) jsonString.c_str());
    
      if (masterCardNumber.indexOf(rfid_tag) >= 0) {
        Serial.println("Access accepted");
        if(latestConditionInt==1){
          relayON();
        } else relayOFF();
        last_tag="";
      }
      else {
        Serial.println("Access denied");
        last_tag="";
      }
    
      delay(3000);
      Serial.println(" ");
      Serial.println("Bring your RFID card closer …");
      
    }
    
    void relayON(){
      digitalWrite(relay1,0);
    }
    
    void relayOFF(){
      digitalWrite(relay1,1);
    }`;
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
