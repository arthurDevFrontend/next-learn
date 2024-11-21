'use client'

import { useEffect, useState } from "react";
import { IUserFaker } from "../constext/user/user.interfaces";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

const URL_API_FAKE_PAGINATOR = 'http://localhost:3000/api/paginator';

export default function Page() {

  const [users, setUsers] = useState<IUserFaker[] | null>();
  const [totalRegs, setTotalRegs] = useState<number>(0);

  const [actualPage, setActualPage] = useState(0)

  const regForPage = 5;
  const pages = Math.ceil(totalRegs / regForPage) - 1;
  const indexShowInTable = actualPage * regForPage;

  useEffect(() => {
    getUsersForPaginator();
  }, []);

  async function getUsersForPaginator() {
    let paginate = {
      "skipR": indexShowInTable,
      "takeR": regForPage
    }
    await fetch(URL_API_FAKE_PAGINATOR, {
      method: 'POST',
      body: JSON.stringify(paginate)
    })
      .then(response => response.json())
      .then((json) => {
        const { res, message } = json;
        const { lenght, listOfUsers, userCreated } = res
        setUsers(listOfUsers)
        setTotalRegs(lenght)
      })
  }

  return (
    <>
      <Link
        href="/user/create"
        className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
      >
        <span>Crear un nuevo usuario</span> <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Genero
              </th>
              <th scope="col" className="px-6 py-3">
                Signo
              </th>
              <th scope="col" className="px-6 py-3">
                Correo
              </th>
            </tr>
          </thead>
          <tbody>
            {
              users && users.map((userInTable, index) => (
                <tr key={`${index}-${userInTable.name}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    <Image className="rounded-s-3xl"
                      src={`${userInTable.image}`}
                      height={50}
                      width={50}
                      alt={userInTable.name}
                    />
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + indexShowInTable + 1}
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {userInTable.name}
                  </th>
                  <td className="px-6 py-4">
                    {userInTable.gender}
                  </td>
                  <td className="px-6 py-4">
                    {userInTable.zodiacSign}
                  </td>
                  <td className="px-6 py-4">
                    {userInTable.email}
                  </td>

                </tr>))
            }
          </tbody>
        </table>
      </div>

      <div className="flex flex-row justify-end items-center my-5 p-5">
        <span>{`Registros totales: ${totalRegs}`}</span>
        <button
          className="p-4 m-1 border barckground bg-[#1da1f2] text-white rounded-sm"
          onClick={() => {
            if (actualPage === 0) return
            setActualPage(actualPage - 1);
            getUsersForPaginator();
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
          </svg>
        </button>

        <span>{`${actualPage} | ${pages}`}</span>

        <button

          className="p-4 m-1 border barckground bg-[#1da1f2] text-white rounded-sm"
          onClick={() => {
            if (actualPage === pages) return
            setActualPage(actualPage + 1);
            getUsersForPaginator()
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </button>
        <span>
          {`Registros desde: ${indexShowInTable + 1} 
          hasta ${((indexShowInTable + regForPage) > totalRegs) ? totalRegs : (indexShowInTable + regForPage)}`
          }</span>
      </div>
    </>
  )
}