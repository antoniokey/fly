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

export interface OnlineUser {
  id: number;
  socketId: string;
}

export interface UserSettingsFormModel {
  email: string;
  first_name?: string | unknown;
  last_name?: string | unknown;
}
