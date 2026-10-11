---
id: wokwi-esp32-mqtt-hivemq
title: Simulasi Telemetri ESP32 & MQTT HiveMQ di Browser (Tanpa Alat Fisik)
category: IoT & Embedded
author: Mu'adz Hudzaifah
date: 2026-09-21
readTime: 6 menit
tags: ["iot", "esp32", "mqtt", "wokwi", "hivemq", "arduino"]
summary: Tutorial membuat simulasi monitoring sensor suhu virtual di Wokwi dan mempublikasikan data telemetry real-time ke broker publik MQTT tanpa membeli modul hardware.
---

## 1. Tujuan Praktikum
Menyelesaikan praktikum Internet of Things (IoT) protokol Machine-to-Machine (M2M) menggunakan MQTT (Message Queuing Telemetry Transport) tanpa kendala hardware rusak, kekurangan kabel jumper, atau ketiadaan router WiFi fisik.

## 2. Prasyarat & Lingkungan
* Akses browser ke simulator online gratis: [Wokwi.com](https://wokwi.com).
* Broker MQTT Publik: `broker.hivemq.com` (Port TCP: 1883).
* MQTT Client Dashboard: MQTTX Desktop Client atau web client di `http://www.hivemq.com/demos/websocket-client/`.

## 3. Rangkaian Virtual di Wokwi
1. Buka Wokwi, buat proyek baru: **ESP32 Arduino**.
2. Tambahkan komponen sensor suhu dan kelembaban **DHT22**.
3. Hubungkan pin:
   * `VCC DHT22` -> `3V3 ESP32`
   * `GND DHT22` -> `GND ESP32`
   * `SDA DHT22` -> `GPIO 15 ESP32`

## 4. Kode Lengkap Arduino / C++

```cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHTesp.h>

const int DHT_PIN = 15;
DHTesp dhtSensor;

// Konfigurasi WiFi Wokwi Virtual
const char* ssid = "Wokwi-GUEST";
const char* password = "";

// Konfigurasi MQTT Broker Publik
const char* mqtt_server = "broker.hivemq.com";
const int mqtt_port = 1883;
const char* mqtt_topic = "boash/trm/telemetry/suhu";

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(10);
  Serial.println("Menghubungkan ke Virtual WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Terkoneksi!");
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Mencoba koneksi MQTT...");
    String clientId = "ESP32Boash-" + String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("Terhubung ke HiveMQ Broker!");
    } else {
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  dhtSensor.setup(DHT_PIN, DHTesp::DHT22);
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  TempAndHumidity data = dhtSensor.getTempAndHumidity();
  String payload = "{\"suhu\":" + String(data.temperature, 2) + 
                   ",\"lembab\":" + String(data.humidity, 1) + "}";
                   
  client.publish(mqtt_topic, payload.c_str());
  Serial.println("Publikasi data: " + payload);
  delay(3000);
}
```

## 5. Pengujian & Monitoring
1. Klik tombol **Play (Simulate)** di Wokwi.
2. Buka web dashboard HiveMQ WebSocket Client di tab browser baru.
3. Hubungkan ke `broker.hivemq.com` port `8000` (atau 8884 SSL).
4. Klik **Subscribe to topic**, masukkan topik: `boash/trm/telemetry/suhu`.
5. Klik sensor DHT22 di simulator Wokwi untuk mengubah suhu. Anda akan melihat payload JSON diterima secara instan tanpa jeda!

## 6. Referensi
* Oasis Standard: *MQTT Version 5.0 Specification*.
* Wokwi Documentation: *ESP32 WiFi Simulation*.
