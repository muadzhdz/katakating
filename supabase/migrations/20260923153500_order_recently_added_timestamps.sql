-- ====================================================================
-- Set chronological sequence for initial guides to establish FIFO queue
-- ====================================================================

-- Oldest to newest baseline
update public.guides set created_at = '2026-09-20 10:00:00+00' where id = 'panduan-kontribusi';
update public.guides set created_at = '2026-09-21 11:00:00+00' where id = 'metodologi-mdlc-multimedia';
update public.guides set created_at = '2026-09-21 14:00:00+00' where id = 'blender-to-unity-pipeline';
update public.guides set created_at = '2026-09-22 09:00:00+00' where id = 'git-workflow-conflict-detached-head';
update public.guides set created_at = '2026-09-22 13:00:00+00' where id = 'wokwi-esp32-mqtt-hivemq';
update public.guides set created_at = '2026-09-22 16:00:00+00' where id = 'algoritma-struktur-data-dasar';
update public.guides set created_at = '2026-09-23 10:00:00+00' where id = 'basis-data-relasional-normalisasi';

-- Top 3 Recently Added (newest)
update public.guides set created_at = '2026-09-23 13:00:00+00' where id = 'setup-wsl2-ubuntu-webdev';
update public.guides set created_at = '2026-09-23 14:00:00+00' where id = 'format-margin-laporan-4433';
update public.guides set created_at = '2026-09-23 15:00:00+00' where id = 'jaringan-routing-vlan-cisco';
