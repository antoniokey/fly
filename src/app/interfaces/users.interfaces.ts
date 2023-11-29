export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  image: string | null;
  image_color: string | null;
  created_at: Date;
  updated_at: Date;
}
