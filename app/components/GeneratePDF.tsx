import { jsPDF, HTMLOptionImage } from "jspdf";
import { toPng, toCanvas } from "html-to-image";

const longsizes = [
  {
    name: 'Nombre',
    position: {
      h: 5,
      v: 0
    }
  }, {
    name: 'Genero',
    position: {
      h: 75,
      v: 0
    }
  }, {
    name: 'Signo',
    position: {
      h: 120,
      v: 0
    }
  }, {
    name: 'Correo',
    position: {
      h: 150,
      v: 0
    }
  }
];

type props = {
  html?: React.MutableRefObject<HTMLDivElement>;
};

import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import { IUserFaker } from "../constext/user/user.interfaces";

const GeneraratePDF: React.FC<props> = ({ html }) => {

  const URL_API_FAKE = 'http://localhost:3000/api/user';

  async function getUsersToPDF() {
    console.log('Voy a traer los usuarios.');
    
    await fetch(URL_API_FAKE)
      .then(response => response.json())
      .then((json) => {
        const { res } = json;
        generatePdf(res)
      })
  }

  const generatePdf = (data: any) => {
    const doc = new jsPDF();
    const jumpLine = 10;
    const initialTable= 30;
    doc.setFontSize(10)
    const { lenght, listOfUsers, userCreated } = data

    doc.text(`Se tienen ${lenght} usuarios registrados`, 5, 10);

    longsizes.map(item => {
      doc.text(item.name, item.position.h, 20);
    })
  
    listOfUsers.map((user: IUserFaker, index: number)=> {
      doc.text(user.name, 5, 30+(index*jumpLine));
      doc.text(user.gender, 75, 30+(index*jumpLine));
      doc.text(user.zodiacSign, 120, 30+(index*jumpLine));
      doc.text(user.name, 150, 30+(index*jumpLine));
    });

    doc.output("dataurlnewwindow");

  };

  return (
    <button onClick={() => getUsersToPDF() }
      className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
    >
      <span>Generar Pdf</span> <ClipboardDocumentListIcon className="w-5 md:w-6" />
    </button>
  )
}

export default GeneraratePDF;
