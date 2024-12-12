import { createContext } from 'react';
import { userContextType } from './user.interfaces';

export const UserContext = createContext<userContextType>({} as userContextType);
