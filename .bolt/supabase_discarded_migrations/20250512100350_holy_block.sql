/*
  # Add certificate storage bucket and policies

  1. Storage
    - Create a new storage bucket for certificates
    - Enable public access for reading certificates
    - Add policy for authenticated users to upload certificates
*/

-- Create a new bucket for storing certificates
INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', true);

-- Allow public access to read certificates
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'certificates');

-- Allow authenticated users to upload certificates
CREATE POLICY "Allow authenticated users to upload certificates"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'certificates');