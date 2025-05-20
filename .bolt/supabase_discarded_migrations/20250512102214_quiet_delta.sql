/*
  # Create storage bucket for certificates

  1. New Storage Bucket
    - Create a new storage bucket named 'certificates' for storing volunteer certificates
  
  2. Security
    - Enable public access to the bucket
    - Add policy for authenticated users to upload files
    - Add policy for public to view files
*/

-- Create a new storage bucket for certificates
INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', true);

-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload certificates"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'certificates');

-- Allow public to view files
CREATE POLICY "Allow public to view certificates"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'certificates');