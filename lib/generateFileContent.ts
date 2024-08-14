import ShortUniqueId from "short-unique-id";

const { randomUUID } = new ShortUniqueId({ length: 10 });

export const generateFileContent = (data: any) => {
  return `
  
  #include <SPI.h>
  #include <Ethernet.h>
  #include <PubSubClient.h>
  #include <ArduinoJson.h>
  #include <Wire.h>
  #include <iostream>
  using namespace std;

  #define RFID Serial2
  #define RXD2 16
  #define TXD2 14
  #define relay1 26
  #define button1 27
  #define red 23
  #define green 22
  #define buzzerpin 21
  
  byte mac[] = {0x02, 0xAD, 0xBB, 0xCD, 0xDE, 0x01};
  EthernetClient client;
  PubSubClient mqttClient(client);
  
  //ALL MQTT VARIABLE
  const char * mqtt_server = "10.1.1.103";
  const int mqtt_port = 1883;
  const char * mqtt_user = "aziz";
  const char * mqtt_pass = "1234";
  const char * deviceId = "${randomUUID()}";
  const char * doorNumber = "${data}";
  const char * auth_topic = "auth";
  const char * door_topic = "auth/${data}";
  
  //millis var
  long millis1 = 0;
  
  // STATIC IP
  #define MYIPADDR 10,62,1,252
  #define MYIPMASK 255,255,255,0
  #define MYGW 10,62,1,254
  #define MYDNS 10,1,1,111
  
  StaticJsonDocument<200> doc1;
  StaticJsonDocument<200> doc2;
  
  char c;
  String rfid_tag, last_tag;
  String masterCardNumber = "310059E5A825";
  
  int latestConditionInt, targetStatusInt, authStatus;
  String targetStatus;
  
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
    if (!mqttClient.connected()) {
      Serial.println("MQTT connection ...");
      
      int randNum = random(100000);
      char buffer[6];
      sprintf(buffer, "%d", randNum);
      char * devId = buffer;

      if (mqttClient.connect(devId, mqtt_user, mqtt_pass)) {
        Serial.println("MQTT Connected");
        mqttClient.subscribe(door_topic);
        Serial.print("door_topic: ");
        Serial.println(door_topic);
      } else {
        Serial.print("failed, rc= ");
        Serial.print(mqttClient.state());
        Serial.println(" try again ...");
        delay(100);
      }
    }
  }


  void mqttCallback(char * topic, byte * payload, unsigned int length) {
    if (String(topic) == door_topic) {
      deserializeJson(doc1, payload, length);

      authStatus = doc1["authStatus"];
      String targetStatus = doc1["targetStatusBool"];
      targetStatusInt = targetStatus.toInt();

      if(authStatus == 1) {
          Serial.println("Access accepted from database");
          digitalWrite(relay1,targetStatusInt);
          latestConditionInt=digitalRead(relay1);
      } else if (authStatus == 0) {
        Serial.println("Access denied");
        last_tag="";
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
        relayOFF();
      } else if (latestConditionInt==1){
        relayON();
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

    if(!mqttClient.connected()){
      if (masterCardNumber.indexOf(rfid_tag) >= 0) {
        Serial.println("Access accepted from master card");
        if(latestConditionInt==1){
          relayON();
        } else relayOFF();
      } else {
        Serial.println("Access denied");
        last_tag="";
      }
      
    }

    else {
      
      doc2["rfid"]=rfid_tag;
      doc2["doorNumber"]=doorNumber;
      doc2["deviceId"]=deviceId;
      doc2["targetStatus"]=targetStatus;
      doc2["targetStatusBool"]=String(targetStatusInt);
    
      String jsonString;
      serializeJson(doc2,jsonString);
    
      mqttClient.publish(auth_topic, (char * ) jsonString.c_str());
    }

    delay(1000);
    Serial.println(" ");
    Serial.println("Bring your RFID card closer …");

  }
  
  void relayON(){
    digitalWrite(relay1,0);
  }
  
  void relayOFF(){
    digitalWrite(relay1,1);
  }

  void lampRed(const String act){
    if (act=="ON"){
      digitalWrite(red,1);
    } else if (act=="OFF"){
      digitalWrite(red,0);
    }
  }

  void lampGreen(const String act){
    if (act=="ON"){
      digitalWrite(green,1);
    } else if (act=="OFF"){
      digitalWrite(green,0);
    }
  }`;
};
