import { JSX } from "react";

export type IUserFaker = {
  name: string;
  gender: string;
  zodiacSign: string;
  email: string;
  image?: string;
};

export type UserProps  = {
  children: JSX.Element | JSX.Element[];
};

export type userContextType = {
  user?: any,
  setUser?: any,
  users?: any
  setUsers?: any
}

export const userContextDefault = {
  user: null,
  setUser: null,
  users: null,
  setUsers: null
}