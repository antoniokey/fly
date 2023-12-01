import { useContext } from 'react';

import { SocketContext, SocketContextType } from '../providers/SocketProvider';

export const useSocket = (): SocketContextType => useContext(SocketContext);
