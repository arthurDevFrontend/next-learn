import { MutableRefObject, ReactNode } from "react";

type props = {
  html?: MutableRefObject<HTMLDivElement>;
};

import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import { ButtonE } from "../ui/Button/ButtonE";
import { generatePdf } from "../functions/utils";

const GeneraratePDF: React.FC<props> = (html) => {

  const URI: any = process.env.NEXT_PUBLIC_URL_API_FAKE_USERS;

  async function getUsersToPDF() {
    await fetch(URI)
      .then(response => response.json())
      .then((json) => {
        const { res } = json;
        const { listOfUsers } = res;
        generatePdf(listOfUsers)
      })
  }

  return (
    <>
      <ButtonE
        label="Generar PDF"
        clickEvent={getUsersToPDF}
      >
        <ClipboardDocumentListIcon className="w-5 md:w-6" />
      </ButtonE>
    </>
  )
}

export default GeneraratePDF;
