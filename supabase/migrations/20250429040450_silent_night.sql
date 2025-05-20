/*
  # Create events and volunteers tables

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `name` (text)
      - `date` (text)
      - `location` (text)
      - `description` (text)
      - `image` (text)
      - `created_at` (timestamptz)

    - `volunteers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `event_id` (uuid, foreign key)
      - `year` (integer)
      - `role` (text)
      - `description` (text)
      - `certificate_image` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
*/

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  date text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS volunteers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  year integer NOT NULL,
  role text NOT NULL,
  description text NOT NULL,
  certificate_image text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access for events"
  ON events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access for volunteers"
  ON volunteers
  FOR SELECT
  TO public
  USING (true);