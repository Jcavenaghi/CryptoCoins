// src/components/TailwindExample.js

import React from 'react';

const TailwindExample = () => {
  return (
    <div className="bg-blue-500 p-4 rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-white">¡Hola, Tailwind CSS!</h1>
      <p className="mt-2 text-white">
        Este es un ejemplo simple para probar el funcionamiento de Tailwind CSS en tu proyecto de React.
      </p>
      <button className="mt-4 bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-blue-400">
        Haz clic
      </button>
    </div>
  );
};

export default TailwindExample;
