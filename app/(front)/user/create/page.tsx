'use client'

import { IUserFaker } from "@/app/context/user/user.interfaces";

import { useState } from "react";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { generateUserRandom } from "@/app/functions/utils";
import { ButtonE } from "@/app/ui/Button/ButtonE";
import { useRouter } from "next/navigation";
import FormularioE from "@/app/components/FormularioE";

export default function () {

  const router = useRouter()

  const [user, setUser] = useState<IUserFaker | null>() 

  function handlerClickNavigate() {
    router.push('/user')
  }

  function handlerClicktoGenerateUserRandom() {
    const userGenerated: IUserFaker = generateUserRandom();
    setUser(userGenerated);
  }

  return (
    <>
      <header className="flex flex-row justify-start gap-5 mb-10">
        <ButtonE
          clickEvent={handlerClickNavigate}
        >
          <ArrowLeftIcon className="w-5 md:w-6" />
        </ButtonE>
        <ButtonE
          label="Generar Usuario aleatoriamente."
          clickEvent={handlerClicktoGenerateUserRandom} />
      </header>

      <FormularioE
        user={user as IUserFaker}></FormularioE>
    </>
  )
}
