'use client'

import { faker } from "@faker-js/faker";
import { useState } from "react";
import { IUserFaker } from "./layout";

const URL_API_FAKE = 'http://localhost:3000/api/userr';
const URL_API_FAKE_PAGINATOR = 'http://localhost:3000/api/paginator';

export default function Page() {

  const [user, setUser] = useState<IUserFaker | null>();
  const [users, setUsers] = useState<IUserFaker[] | null>();
  const [totalRegs, setTotalRegs] = useState<number>(0);

  const [actualPage, setActualPage] = useState(0)

  const regForPage = 5;
  const pages = Math.ceil(totalRegs / regForPage) - 1;
  const indexShowInTable = actualPage * regForPage;

  function generateUserRandom() {
    let userFaker: IUserFaker = {
      name: faker.person.fullName(),
      gender: faker.person.gender(),
      zodiacSign: faker.person.zodiacSign(),
      email: faker.internet.email()
    }
    setUser(userFaker)
  }

  async function sendUserFake() {
    await fetch(URL_API_FAKE, {
      method: 'POST',
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then((json) => {
        const { res, message } = json;
        const { lenght, listOfUsers, userCreated } = res
        setUser(null);
        setUsers(listOfUsers)
        setTotalRegs(lenght)
      })
  }

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
      <button className="p-4 m-1 border barckground bg-[#1da1f2] text-white" onClick={() => {
        generateUserRandom()
      }}>Generar Usuarios aleatoriamente.</button>

      {user && (
        <div className="flex flex-col p-4 gap-y-4 border">
          <header>
            <span className="text-xl">Nombre: {user.name}</span>
          </header>
          <main className="flex flex-col p-4">
            <span>Genero: {user.gender}</span>
            <span>Signo zodical: {user.zodiacSign}</span>
          </main>
          <footer className="flex flex-row justify-between">
            <span>Correo: {user.email}</span>
            <button
              className="p-4 m-1 border barckground bg-[#1da1f2] text-white"
              onClick={() => {
                sendUserFake();
              }}>Enviar</button>
          </footer>
        </div>

      )}


      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
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
          {`Registros desde: ${indexShowInTable}
          hasta ${((indexShowInTable + regForPage) > totalRegs) ? totalRegs : (indexShowInTable + regForPage) - 1}`
          }</span>
      </div>
    </>
  )
}