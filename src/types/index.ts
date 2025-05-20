export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  image: string;
  created_at?: string;
}

export interface Volunteer {
  id: string;
  name: string;
  event_id: string;
  year: number;
  role: string;
  description: string;
  certificate_image: string;
  created_at?: string;
}