'use client'

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user/userContext";
import Image from "next/image";
import Paginator from "./Paginator";
import SandwichImage, { Images } from "@/app/components/SandwichImage";

type tableProps = {
  withPaginator?: boolean | false
}

export const TableAHM = ({ withPaginator }: tableProps) => {

  const { users } = useContext(UserContext);

  const [actualPage] = useState(0)
  const regForPage = 5;
  const indexShowInTable = actualPage * regForPage;

  return (
    <div className="relative overflow-x-auto mt-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
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
              Edad
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
                <td className="px-6 py-4">
                  <SandwichImage images={userInTable.images} />
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {userInTable.name}
                </th>
                <td className="px-6 py-4">
                  {userInTable.gender}
                </td>
                <td className="px-6 py-4">
                  {userInTable.age}
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

      { withPaginator && (<Paginator />) }
    </div>
  )
}

export default TableAHM
