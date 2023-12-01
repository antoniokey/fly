import { OnlineUser } from '../interfaces/users.interfaces';

export const isUserOnline = (onlineUsers: OnlineUser[], userId: number): boolean =>
  onlineUsers.some(user => user.id === userId);

