import { createContext } from 'react';
import { userContextDefault, userContextType } from './user.interfaces';

export const UserContext = createContext<userContextType>(userContextDefault);


