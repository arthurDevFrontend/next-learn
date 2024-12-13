'use client'

import { useEffect, useState, useRef, useContext, ChangeEvent } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import dynamic from "next/dynamic";
import { UserContext } from "@/app/context/user/userContext";
import { Users } from "@prisma/client";
import { TableAHM } from "@/app/modules/Table/Table";
import { generateData, generatePdf } from "@/app/functions/utils";
import { ButtonE } from "@/app/ui/Button/ButtonE";
import { useRouter } from "next/navigation";

const GeneratePDF = dynamic( ()=> import("../../components/GeneratePDF"), {ssr: false})

const URL_API_FAKE_PAGINATOR = 'http://localhost:3000/api/paginator';

export default function Page() {
  const router = useRouter();

  const { users, setUsers, totalRegs, setTotalRegs } = useContext(UserContext)

  const ref = useRef({} as any);

  const [actualPage, setActualPage] = useState(0)
  const [search, setSearch] = useState('')

  const regForPage = 1000;
  const pages = Math.ceil(totalRegs / regForPage) - 1;
  const indexShowInTable = actualPage * regForPage;

  function handlerSearch(e: ChangeEvent<any>) {
    let {value} = e.target
    
    setSearch(value);
    serachBySign(value);
  }

  async function serachBySign(sign: any) {
    const URI: any = process.env.NEXT_PUBLIC_URL_API_FAKE_USERS;

    await fetch(URI, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((json) => {
        const { res } = json;
        const { length, listOfUsers } = res
        setUsers!(listOfUsers.filter( (user: Users) => user.zodiacSign.toLowerCase().includes(search) ))
        setTotalRegs(length)
      })
  }

  useEffect(() => {
    getUsersForPaginator();
  }, []);

  async function getUsersForPaginator() {
    const URI: any = process.env.NEXT_PUBLIC_URL_API_FAKE_PAGINATOR
    let paginate = {
      "skipR": indexShowInTable,
      "takeR": regForPage
    }
    await fetch(URI, {
      method: 'POST',
      body: JSON.stringify(paginate)
    })
      .then(response => response.json())
      .then((json) => {
        const { res } = json;
        const { lenght, listOfUsers } = res
        setUsers!(listOfUsers)
        setTotalRegs(lenght)
      })
  }

  function handleClickGenerateUsers() {
    let usersGenerated = generateData(1000) || []
    if (usersGenerated && usersGenerated.length > 0) {
      setUsers!(usersGenerated);
      generatePdf(usersGenerated);
    }
  }

  function handleClickNavigate() {
    router.push("/user/create")
  }

  return (
    <>
      <div className="flex flex-row justify-between gap-5 mb-10">

        <ButtonE 
          label="Crear un nuevo usuario"
          clickEvent={handleClickNavigate}>
          <ArrowRightIcon className="w-3 md:w-6"/>
        </ButtonE>

        <ButtonE
          label="Generar data aleatoria in PDF"
          clickEvent={handleClickGenerateUsers}
          >
          </ButtonE>

        <input
          type="text"
          name="search"
          value={search}
          placeholder="filtrar por signo"
          onChange={(e: ChangeEvent<any>) => handlerSearch(e)}/>

        <GeneratePDF/>
      </div>

      <TableAHM withPaginator={false}/>
    </>
  )
}