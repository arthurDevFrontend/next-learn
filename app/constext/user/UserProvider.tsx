import { useState } from "react";
import { UserContext } from "./userContext";
import { IUserFaker, UserProps } from "./user.interfaces";

export default function UserProvider({ children }: UserProps) {
  const [user, setUser] = useState<IUserFaker | null>();
  // const [users, setUsers] = useState<IUserFaker[] | null>();
  // const [totalRegs, setTotalRegs] = useState<number>(0);

  return (
    <UserContext.Provider value={{
      user,
      setUser
    }}>
      {children}
    </UserContext.Provider>
  )
}