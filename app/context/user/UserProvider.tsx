import { useState } from "react";
import { UserContext } from "./userContext";
import { IUserFaker, UserProviderProps } from "./user.interfaces";

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<IUserFaker>();
  const [users, setUsers] = useState<IUserFaker[]>();
  const [totalRegs, setTotalRegs] = useState<number>(0);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      users,
      setUsers,
      totalRegs,
      setTotalRegs
    }}>
      {children}
    </UserContext.Provider>
  )
}