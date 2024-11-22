'use client'

import { IUserFaker } from "@/app/constext/user/user.interfaces";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { redirect } from 'next/navigation';

export default function page() {

  const { register, handleSubmit } = useForm();


  console.log(redirect);
  

  // const [user, setUser] = useContext<any>(UserContext)
  const [user, setUser] = useState<IUserFaker | null>()
  const [users, setUsers] = useState<IUserFaker[] | null>();
  const [totalRegs, setTotalRegs] = useState<number>(0);
  const [image, setImage] = useState<any>(null)

  const URL_API_FAKE = 'http://localhost:3000/api/user';

  useEffect(() => {
    generateUserRandom()
  }, [])

  function generateUserRandom() {
    let userFaker: IUserFaker = {
      name: faker.person.fullName(),
      gender: faker.person.gender(),
      zodiacSign: faker.person.zodiacSign(),
      email: faker.internet.email(),
    }
    setUser(userFaker)
  }

  const onSubmit = async (data: any) => {

    const formData = new FormData();

    formData.append("file", data.file[0]);
    formData.append('name', JSON.stringify(user?.name));
    formData.append('gender', JSON.stringify(user?.gender));
    formData.append('zodiacSign', JSON.stringify(user?.zodiacSign));
    formData.append('email', JSON.stringify(user?.email));

    const res = await fetch(URL_API_FAKE, {
      method: "POST",
      body: formData,
    }).then(response => response.json())
      .then((json) => {
        const { res, message } = json;
        const { lenght, listOfUsers, userCreated } = res
        setUsers(listOfUsers)
        setTotalRegs(lenght)
        setUser(null);
      });

      redirect('/user')
  }

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  return (
    <>
      <header className="flex flex-row justify-start gap-5 mb-10">
        <Link
          href="/user"
          className="flex items-center self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
        >
          <span></span> <ArrowLeftIcon className="w-5 md:w-6" />
        </Link>
        <button className="flex items-center self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base" onClick={() => {
          generateUserRandom()
        }}>Generar Usuarios aleatoriamente.</button>
      </header>

      {user && (
        <form className="flex flex-col p-4 gap-y-4 border" onSubmit={handleSubmit(onSubmit)}>
          <header>
            <span className="text-xl">Nombre: {user.name}</span>
          </header>
          <main className="flex flex-row p-4">
            <section className="flex flex-col p-4">
              <span>Genero: {user.gender}</span>
              <span>Signo zodical: {user.zodiacSign}</span>
              <input type="file" {...register("file")} title="Cargar imagen" onChange={onImageChange} />
            </section>
            <section>
              <Image
                src={image}
                width={500}
                height={500}
                alt={user.name}
              />
            </section>
          </main>
          <footer className="flex flex-row justify-between">
            <span>Correo: {user.email}</span>
            <input
              type="submit"
              value="Crear usuario"
              className="p-4 m-1 border barckground bg-[#1da1f2] text-white"
            />
          </footer>
        </form>
      )}
    </>
  )
}
