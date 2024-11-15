'use client'

import { faker } from "@faker-js/faker";
import { useState } from "react";
import { IUserFaker } from "./layout";

const URL_API_FAKE = 'http://localhost:3000/api/userr';

export default function Page() {

  const [user, setUser] = useState<IUserFaker | null>();
  const [users, setUsers] = useState<IUserFaker[] | null>();

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
    }).then((data) => {
      const {res, message} = data.json();
      console.log('Respuesta devuelta desde el api fake', data.json());
      //setUser(data.body?.res.listOfUsers)
      setUser(null)
    });
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


      <div className="relative overflow-x-auto">
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
              users && users.map((userInTable) => 
              
              
           ( <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {userInTable.name}
              </th>
              <td className="px-6 py-4">
                
              </td>
              <td className="px-6 py-4">
                
              </td>
              <td className="px-6 py-4">
                
              </td>
            </tr>))
            }
          </tbody>
        </table>
      </div>

    </>
  )
}