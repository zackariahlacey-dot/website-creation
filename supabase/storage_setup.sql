-- Create storage bucket for project assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-assets', 'project-assets', false);

-- Set up RLS for project-assets bucket
-- 1. Allow clients to upload to their own folder
CREATE POLICY "Clients can upload to their own folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'project-assets' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- 2. Allow clients to view their own folder
CREATE POLICY "Clients can view their own folder"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'project-assets' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- 3. Allow Admin to view/manage all assets
CREATE POLICY "Admin has full access to project-assets"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'project-assets' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
)
WITH CHECK (
  bucket_id = 'project-assets' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);
