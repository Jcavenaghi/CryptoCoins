// src/components/Home.js

import React, { useState, useEffect } from 'react';

function Home()  {
    const [cryptos, setCryptos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cryptosPerPage] = useState(10);

    useEffect(() => {
        const fetchCryptos = async () => {
        try {
            const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${cryptosPerPage}&page=${currentPage}&sparkline=false`
            );

            if (!response.ok) {
            throw new Error('Error fetching data from CoinGecko API');
            }

            const data = await response.json();
            setCryptos(data);
        } catch (error) {
            console.error('Error fetching data from CoinGecko API', error);
        }
        };

        fetchCryptos();
    }, [currentPage, cryptosPerPage]);

    // Paginación
    const totalPages = Math.max(Math.ceil(250 / cryptosPerPage), 1);
    
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    return (
        <div className="bg-red-100 p-8">
        <h1 className="text-4xl font-bold mb-4">Explora Criptomonedas</h1>
        <p className="text-lg mb-8">
            Descubre información sobre las criptomonedas más populares en el mercado.
        </p>

        {cryptos.map((crypto) => (
            <div
            key={crypto.id}
            className="flex items-center justify-between bg-orange-50 p-4 rounded-md shadow-md mb-4"
            >
            <div className="flex items-center">
                <img
                src={crypto.image}
                alt={`${crypto.name} Logo`}
                className="w-8 h-8 mr-2"
                />
                <div>
                <p className="text-lg font-bold">
                    {`${crypto.name} [${crypto.symbol}]`}
                </p>
                <p className="text-gray-600">{crypto.symbol}</p>
                </div>
            </div>
            <div className="flex items-end flex-col text-right">
                <p className={`text-2xl font-bold ${crypto.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${crypto.current_price}
                </p>
                <p className={`text-sm ${crypto.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {crypto.price_change_percentage_24h.toFixed(2)}%
                </p>
            </div>
            </div>
        ))}

        {/* Paginación */}
        <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          className={`mx-2 p-2 focus:outline-none ${
            currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-800 text-white font-bold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded'
          }`}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-2 p-2 focus:outline-none ${
              currentPage === index + 1 ? 'bg-indigo-500 text-white font-bold' : 'bg-indigo-200 rounded text-white'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className={`mx-2 p-2 focus:outline-none ${
            currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-800 text-white font-bold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded'
          }`}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
    );
};

export default Home;
