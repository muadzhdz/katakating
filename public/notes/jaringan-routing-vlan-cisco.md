---
id: jaringan-routing-vlan-cisco
title: Konfigurasi Inter-VLAN Routing & Trunking pada Cisco Packet Tracer
category: Jaringan Komputer
author: Mu'adz Hudzaifah
date: 2026-09-21
readTime: 7 menit
tags: ["jaringan", "cisco", "vlan", "routing", "packet-tracer", "networking"]
summary: Tutorial konfigurasi jaringan switch layer-2 dan router on-a-stick untuk memisahkan segmentasi traffic mahasiswa dan dosen di lab praktikum.
---

## 1. Tujuan Praktikum
Memahami konsep segmentasi Local Area Network menggunakan Virtual LAN (VLAN) dan mengonfigurasi Router-on-a-Stick (802.1Q Encapsulation) pada Cisco IOS agar host yang berada pada subnet VLAN berbeda dapat saling berkomunikasi secara terkontrol.

## 2. Topologi & Alokasi Subnet
* **Switch**: Cisco Catalyst 2960
* **Router**: Cisco 2911
* **VLAN 10 (Mahasiswa)**:
  * Network: `192.168.10.0/24`
  * Gateway: `192.168.10.1`
* **VLAN 20 (Dosen)**:
  * Network: `192.168.20.0/24`
  * Gateway: `192.168.20.1`

## 3. Langkah Konfigurasi

### 3.1. Konfigurasi VLAN pada Switch
Buka CLI Switch 2960 dan daftarkan database VLAN:

```cisco
Switch> enable
Switch# configure terminal
Switch(config)# vlan 10
Switch(config-vlan)# name VLAN_MAHASISWA
Switch(config-vlan)# exit

Switch(config)# vlan 20
Switch(config-vlan)# name VLAN_DOSEN
Switch(config-vlan)# exit
```

### 3.2. Penentuan Access Port ke PC Client
Arahkan port FastEthernet 0/1 ke VLAN 10 dan FastEthernet 0/2 ke VLAN 20:

```cisco
# Port untuk PC Mahasiswa
Switch(config)# interface FastEthernet 0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10
Switch(config-if)# exit

# Port untuk PC Dosen
Switch(config)# interface FastEthernet 0/2
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 20
Switch(config-if)# exit
```

### 3.3. Konfigurasi Trunking Port ke Router
Port uplink yang mengarah ke router (misal GigabitEthernet 0/1) wajib diatur ke mode Trunk agar membawa paket dari banyak VLAN:

```cisco
Switch(config)# interface GigabitEthernet 0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# exit
```

### 3.4. Konfigurasi Sub-Interface (Router-on-a-Stick)
Pada Router 2911, aktifkan interface fisik dan buat sub-interface virtual untuk tiap ID VLAN:

```cisco
Router> enable
Router# configure terminal
Router(config)# interface GigabitEthernet 0/0
Router(config-if)# no shutdown
Router(config-if)# exit

# Sub-interface VLAN 10
Router(config)# interface GigabitEthernet 0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0
Router(config-subif)# exit

# Sub-interface VLAN 20
Router(config)# interface GigabitEthernet 0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0
Router(config-subif)# exit
```

## 4. Pengujian & Verifikasi
1. Atur IP Address di PC Mahasiswa: `192.168.10.10`, Subnet: `255.255.255.0`, Gateway: `192.168.10.1`.
2. Atur IP Address di PC Dosen: `192.168.20.10`, Subnet: `255.255.255.0`, Gateway: `192.168.20.1`.
3. Buka Command Prompt pada PC Mahasiswa, jalankan ping lintas VLAN:
```bash
ping 192.168.20.10
```
Jika konfigurasi benar, ping pertama mungkin RTO (karena ARP discovery), lalu paket berikutnya akan menghasilkan status **Reply from 192.168.20.10: bytes=32 time=1ms TTL=127**.

## 5. Referensi
* Cisco Networking Academy: *CCNA Routing and Switching - Introduction to Networks*.
* Tanenbaum, A. S., & Wetherall, D. J. (2011). *Computer Networks (5th Edition)*.
