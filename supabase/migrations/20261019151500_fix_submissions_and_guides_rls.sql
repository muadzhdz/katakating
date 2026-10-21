-- Fix Submissions & Guides RLS and Permissions for KataKating Moderation
-- Enables public/admin moderation read, update, and delete on submissions,
-- and allows published approved guides to be inserted into public.guides.

-- 1. Ensure admin_notes column exists on public.submissions
ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS admin_notes TEXT DEFAULT '';

-- 2. Grant permissions to anon & authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE public.submissions TO anon, authenticated;
GRANT ALL ON TABLE public.guides TO anon, authenticated;

-- 3. RLS Policies on public.submissions
DROP POLICY IF EXISTS "Allow read access to submissions" ON public.submissions;
CREATE POLICY "Allow read access to submissions"
  ON public.submissions FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow update access to submissions" ON public.submissions;
CREATE POLICY "Allow update access to submissions"
  ON public.submissions FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow delete access to submissions" ON public.submissions;
CREATE POLICY "Allow delete access to submissions"
  ON public.submissions FOR DELETE
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow anonymous insert to submissions" ON public.submissions;
CREATE POLICY "Allow anonymous insert to submissions"
  ON public.submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 4. RLS Policies on public.guides
DROP POLICY IF EXISTS "Allow public insert to guides" ON public.guides;
CREATE POLICY "Allow public insert to guides"
  ON public.guides FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update to guides" ON public.guides;
CREATE POLICY "Allow public update to guides"
  ON public.guides FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
