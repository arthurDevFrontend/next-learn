import jsPDF from "jspdf";
import { IUserFaker } from "../context/user/user.interfaces";
import { faker } from "@faker-js/faker";

function getRandomBetween20And130() {
  return Math.floor(Math.random() * (131 - 20) + 20);
}

export function generateUserRandom(): IUserFaker {
  let userGenerated: IUserFaker = {
    name: faker.person.fullName(),
    gender: faker.person.gender(),
    age: getRandomBetween20And130(),
    zodiacSign: faker.person.zodiacSign(),
    email: faker.internet.email(),
  };
  return userGenerated;
}

export function generateData(userLenght: number): IUserFaker[] {  
  let usersGenerated: IUserFaker[] = [];
  Array.from({ length: userLenght }, (_, index) => {
    usersGenerated.push(generateUserRandom());
  });
  return usersGenerated;
}

export const generatePdf = (listOfUsers: IUserFaker[]) => {
  const doc = new jsPDF();
  const jumpLine = 3;
  const initialTable = 25;
  const longsizes = [
    {
      name: 'Nombre',
      position: 5
    },{
      name: 'Genero',
      position: 75
    },{
      name: 'Signo',
      position: 120
    },{
      name: 'Correo',
      position: 150
    }]
  doc.setFontSize(6)

  doc.text(`Se tienen ${listOfUsers.length} usuarios registrados`, 5, 10);

  longsizes.map(item => {
    doc.text(item.name, item.position, 20);
  })

  listOfUsers.map((user: IUserFaker, index: number) => {
    doc.text(user.name, 5, initialTable + (index * jumpLine));
    doc.text(user.gender, 75, initialTable + (index * jumpLine));
    doc.text(user.zodiacSign, 120, initialTable + (index * jumpLine));
    doc.text(user.name, 150, initialTable + (index * jumpLine));
  });

  doc.save('a4.pdf')
  doc.output("dataurlnewwindow");
};