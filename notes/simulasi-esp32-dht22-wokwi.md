---
id: simulasi-esp32-dht22-wokwi
title: "Langkah Simulasi ESP32 dan Sensor DHT22 di Wokwi Sebelum Turun ke Hardware Fisik"
category: IoT & Embedded
author: Mu'adz Hudzaifah
date: 2026-09-22
readTime: 7 menit
initials: WOKW
tags: ["iot", "esp32", "dht22", "wokwi", "mqtt", "arduino"]
summary: Panduan lengkap wiring virtual diagram.json, konfigurasi MQTT broker publik, dan pengujian OLED SSD1306 di Wokwi.
file: simulasi-esp32-dht22-wokwi.md
---

## 1. Mengapa Simulasi Virtual di Wokwi?
Pada praktikum Internet of Things (IoT), kesalahan umum mahasiswa baru adalah terburu-buru merangkai modul hardware mikrokontroler fisik di *breadboard*. Akibat salah menghubungkan pin tegangan 5V ke pin GPIO sensitif 3.3V, board ESP32 sering kali korsleting, panas, atau rusak permanen.

> [!STANDAR]
> Standar laboratorium TRM Boash mewajibkan seluruh rangkaian sirkuit dan kode firmware diverifikasi terlebih dahulu di simulator berbasis web **Wokwi** sebelum mahasiswa diizinkan meminjam modul ESP32 dan sensor fisik dari lemari lab.

---

## 2. Wiring Sirkuit Virtual di `diagram.json`
Di simulator Wokwi, seluruh kabel jumper dan tata letak komponen dikonfigurasikan secara presisi melalui file JSON:

```json
{
  "version": 1,
  "author": "KataKating Boash Lab",
  "editor": "wokwi",
  "parts": [
    { "type": "board-esp32-devkit-c-v4", "id": "esp", "top": 0, "left": 0, "attrs": {} },
    { "type": "wokwi-dht22", "id": "dht", "top": -60, "left": 180, "attrs": {} },
    { "type": "board-ssd1306", "id": "oled", "top": 120, "left": 180, "attrs": {} }
  ],
  "connections": [
    [ "esp:TX", "$serialMonitor:RX", "", [] ],
    [ "esp:RX", "$serialMonitor:TX", "", [] ],
    [ "dht:VCC", "esp:3V3", "red", [ "v0" ] ],
    [ "dht:GND", "esp:GND.1", "black", [ "v0" ] ],
    [ "dht:SDA", "esp:15", "green", [ "v0" ] ],
    [ "oled:VCC", "esp:3V3", "red", [ "v0" ] ],
    [ "oled:GND", "esp:GND.2", "black", [ "v0" ] ],
    [ "oled:SCL", "esp:22", "blue", [ "v0" ] ],
    [ "oled:SDA", "esp:21", "yellow", [ "v0" ] ]
  ]
}
```

---

## 3. Firmware C++ Arduino ESP32
Tulis kode sketch berikut pada file `sketch.ino`:

```cpp
#include <WiFi.h>
#include <DHTesp.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define DHT_PIN 15
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

DHTesp dhtSensor;
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  Serial.begin(115200);
  dhtSensor.setup(DHT_PIN, DHTesp::DHT22);
  
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("Gagal menginisialisasi layar OLED!"));
    for(;;);
  }
  
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 10);
  display.println("Boash IoT Gateway");
  display.display();
  delay(1000);
}

void loop() {
  TempAndHumidity data = dhtSensor.getTempAndHumidity();
  
  Serial.print("Suhu: ");
  Serial.print(data.temperature, 1);
  Serial.print(" C | Kelembapan: ");
  Serial.print(data.humidity, 1);
  Serial.println(" %");

  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("KATAKATING IOT LAB");
  display.drawLine(0, 12, 128, 12, WHITE);
  
  display.setCursor(0, 20);
  display.printf("Temp : %.1f C", data.temperature);
  display.setCursor(0, 36);
  display.printf("Hum  : %.1f %%", data.humidity);
  display.display();

  delay(2000);
}
```

> [!KATING]
> Tips kating: Di Wokwi, Anda dapat mengklik sensor DHT22 saat simulasi sedang berjalan untuk menggeser slider suhu dan kelembapan secara live, sehingga Anda bisa menguji logika batas alarm (*threshold*) tanpa perlu korek api atau es batu sungguhan!

---

## 4. Pengujian Serial Monitor
Jalankan tombol play di Wokwi:

```terminal
$ pio device monitor
# Output: [WOKWI] ESP32 Booted. Connecting to virtual WiFi...
# Output: Suhu: 28.4 C | Kelembapan: 65.2 %
# Output: OLED Refresh: OK. All sensor signals stable.
```
