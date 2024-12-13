import { useContext, useEffect, useState } from "react";

import { UserContext } from "@/app/context/user/userContext";

import { ButtonE } from "@/app/ui/Button/ButtonE";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const Paginator = () => {
  const paginatorJump = 5;

  const {totalRegs} = useContext(UserContext);

  const [pages, setPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(()=> {
    const pages = Math.ceil(totalRegs / paginatorJump);
    setPages(pages);
    
  }, [totalRegs])

  return (
    <div className="flex flex-row justify-end items-center my-5 p-5">

      <span className="px-3">{`Registros totales: ${totalRegs}`}</span>

      <ButtonE>
        <ArrowLeftIcon className="w-5 md:w-6" />
      </ButtonE>

      <span className="px-3">{`${currentPage} | ${pages}`}</span>

      <ButtonE>
        <ArrowRightIcon className="w-5 md:w-6" />
      </ButtonE>
    </div>
  )
}

export default Paginator
