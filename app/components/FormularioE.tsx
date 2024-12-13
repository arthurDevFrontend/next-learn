'use client'

import React, { useState, useEffect, useRef } from 'react';
import { IUserFaker } from '../context/user/user.interfaces';

import { ChevronLeft, ChevronRight, Eraser } from 'lucide-react';

import { useRouter } from 'next/navigation'
import { ButtonE } from '../ui/Button/ButtonE';

type userProp = {
  user: IUserFaker;
}

const FormularioE = ({ user }: userProp) => {

  const sliderRef = useRef<HTMLDivElement>(null);

  const router = useRouter()

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState();
  const [genero, setGenero] = useState('');
  const [signo, setSigno] = useState('');
  const [correo, setCorreo] = useState('');
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    (user?.name) ? setNombre(user.name) : '';
    (user?.age) ? setEdad(user.age as any) : '';
    (user?.gender) ? setGenero(user.gender) : '';
    (user?.zodiacSign) ? setSigno(user.zodiacSign) : '';
    (user?.email) ? setCorreo(user.email) : '';
  }, [user]);

  useEffect(() => {
    const isValid =
      correo.trim() !== '' &&
      nombre.trim() !== '' &&
      imagenes.length > 0;
    setIsFormValid(isValid);
  }, [nombre, correo, imagenes]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImagenes = [...imagenes];
    const newPreviews = [...previews];

    files.forEach(file => {
      if (!imagenes.some(img => img.name === file.name && img.size === file.size)) {
        newImagenes.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }
    });

    setImagenes(newImagenes);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('edad', edad as any);
    formData.append('genero', genero);
    formData.append('signo', signo);
    formData.append('correo', correo);

    imagenes.forEach((imagen) => {
      formData.append('imagenes', imagen);
    });
      const URI = process.env.NEXT_PUBLIC_URL_API_FAKE as string;
      const response = await fetch(URI, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        handleClickLimpiar();
        router.push('/user');
      } else {
        const errorData = await response.json();
        console.error(`Error al procesar los datos: ${errorData.error}`);
      }

  };

  const handleRemoveImage = (index: number) => {
    const newImagenes = [...imagenes];
    newImagenes.splice(index, 1);
    setImagenes(newImagenes);

    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);

    const fileInput = document.getElementById('imagenes') as HTMLInputElement;
    if (fileInput) {
      const dt = new DataTransfer();
      newImagenes.forEach(file => dt.items.add(file));
      fileInput.files = dt.files;
    }
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 200; // Ajusta este valor según sea necesario
      if (direction === 'left') {
        sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleClickLimpiar = () => {
    setNombre('');
    setEdad('' as any);
    setGenero('');
    setSigno('');
    setCorreo('');
    setImagenes([]);
    setPreviews([]);
    const fileInput = document.getElementById('imagenes') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
  return (
    <>
      {previews.length > 0 && (
        <div className="relative mt-4">
          <button
            type="button"
            onClick={() => scrollSlider('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 z-10"
            aria-label="Desplazar a la izquierda"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <div
            ref={sliderRef}
            className="flex overflow-x-auto space-x-2 py-2 px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {previews.map((preview, index) => (
              <div key={index} className="relative flex-shrink-0">
                <img src={preview} alt={`Preview ${index + 1}`} className="w-24 h-24 object-cover rounded-md" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  aria-label={`Eliminar imagen ${index + 1}`}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollSlider('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 z-10"
            aria-label="Desplazar a la derecha"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
        <div className='flex flex-row-reverse'>
          <ButtonE
            clickEvent={handleClickLimpiar}>
            <Eraser />
          </ButtonE>
        </div>
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="edad" className="block text-sm font-medium text-gray-700">Edad:</label>
          <input
            type="number"
            id="edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value as any)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="genero" className="block text-sm font-medium text-gray-700">Género:</label>
          <input
            type="text"
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="signo" className="block text-sm font-medium text-gray-700">Signo zodiacal:</label>
          <input
            type="text"
            id="signo"
            value={signo}
            onChange={(e) => setSigno(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo electrónico:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="imagenes" className="block text-sm font-medium text-gray-700">Imágenes:</label>
          <input
            type="file"
            id="imagenes"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Enviar
        </button>
      </form>
    </>
  );
};

export default FormularioE;
