export interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: Date;
  updated_at: Date;
}
