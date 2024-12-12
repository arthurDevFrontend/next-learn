'use client'

import { IUserFaker } from "@/app/context/user/user.interfaces";

import Image from "next/image";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { generateUserRandom } from "@/app/functions/utils";
import { ButtonE } from "@/app/ui/Button/ButtonE";
import { useRouter } from "next/navigation";

export default function page() {

  const router = useRouter()

  const { register, handleSubmit } = useForm();

  const [user, setUser] = useState<IUserFaker | null>()
  const [users, setUsers] = useState<IUserFaker[] | null>();
  const [totalRegs, setTotalRegs] = useState<number>(0);
  const [images, setImages] = useState<any>(null)

  const URL_API_FAKE = 'http://localhost:3000/api/user';

  useEffect(() => {
    handlerClicktoGenerateUserRandom()
  }, [])

  const onSubmit = async (data: any) => {

    const formData = new FormData();
    
    if (data.file.length > 0) {
      formData.append("fileArrayLenght", data.file.length);
      for (let init = 0; init < data.file.length; init++) {
        formData.append(`file${init}`, data.file[init]);
      }
    }

    formData.append('name', JSON.stringify(user?.name));
    formData.append('gender', JSON.stringify(user?.gender));
    formData.append('age', JSON.stringify(user?.age));
    formData.append('zodiacSign', JSON.stringify(user?.zodiacSign));
    formData.append('email', JSON.stringify(user?.email));

    const res = await fetch(URL_API_FAKE, {
      method: "POST",
      body: formData,
    })
    .then(response => response.json())
    .then((json) => {
      const { res } = json;
      const { length, listOfUsers } = res
      setUsers(listOfUsers)
      setTotalRegs(length)
      setUser(null);
    });
  }

  const onImageChange = (event: any) => {
    const { files } = event.target;
    let images: any[] = []
    if (files && files.lenght > 0) {

      files.map((file: Blob) => {
        images.push(URL.createObjectURL(file));
      })

      setImages(images);
    }
  }

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

      {user && (
        <form className="flex flex-col p-4 gap-y-4 border" onSubmit={handleSubmit(onSubmit)} >
          <header>
            <span className="text-xl">Nombre: {user.name}</span>
          </header>
          <section className="flex flex-row p-4">
            <section className="flex flex-col p-4">
              <span>Genero: {user.gender}</span>
              <span>Edad: {user.age}</span>
              <span>Signo zodical: {user.zodiacSign}</span>
              <input
                className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 mt-6 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                type="file" {...register("file")} title="Cargar imagen" onChange={onImageChange} multiple />
            </section>
            <section>
              {images && images.map((i: string) => {
                <Image
                  src={i}
                  width={500}
                  height={500}
                  alt={user.name}
                />
              }
              )}
            </section>
          </section>
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
