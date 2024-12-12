import { ReactNode } from "react";

export type IUserFaker = {
  name: string;
  gender: string;
  age?: number; 
  zodiacSign: string;
  email: string;
  images?: Image[];
};

export interface Image {
  image: string
}

export type UserProviderProps  = {
  children: ReactNode
};

export type userContextType = {
  user?: IUserFaker,
  setUser?: (user: IUserFaker) => void ,
  users?: IUserFaker[],
  setUsers?: (users: IUserFaker[]) => void,
  totalRegs: number,
  setTotalRegs: (number: number) => void
}

export const userContextDefault = {
  user: null,
  setUser: null,
  users: null,
  setUsers: null
}
