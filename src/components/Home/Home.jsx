// src/components/Home.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


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
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    return (
        <div className="bg-rose-200 p-8 min-h-screen ">
        <h1 className="text-4xl font-bold text-center font-mono mb-8">Explora las criptomonedas</h1>
        <p className="text-lg font-mono mb-8 text-center">
            Descubre información sobre las criptomonedas más populares en el mercado. Podrás ver su variación en las últimas 24 horas.
        </p>

        {cryptos.map((crypto) => (
          <Link key={crypto.id} to={`/coinDetail/${crypto.id}`}>
            <div className="flex items-center justify-between bg-orange-50 p-4 rounded-md shadow-md mb-4 transition-transform duration-300 transform hover:scale-105 hover:bg-yellow-100">
              <div className="flex items-center">
                <img src={crypto.image} alt={`${crypto.name} Logo`} className="w-8 h-8 mr-2" />
                <div>
                  <p className="text-lg font-bold">{`${crypto.name}`}</p>
                  <p className="text-gray-600">{crypto.symbol}</p>
                </div>
              </div>
              <div className="flex items-end flex-col text-right">
                <p
                  className={`text-2xl font-bold ${
                    crypto.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  ${crypto.current_price}
                </p>
                <p
                  className={`text-sm ${
                    crypto.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </div>
          </Link>
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
          <button
            onClick={() => handlePageChange(currentPage)}
            className={`mx-2 p-2 focus:outline-none ${
              'bg-indigo-300 text-white font-bold'
            }`}
          >
            {currentPage}
          </button>
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`mx-2 p-2 focus:outline-none ${
                'bg-indigo-500 hover:bg-indigo-800 text-white font-bold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded'
              }`}
            >
              Siguiente
            </button>
          )}
        </div>

    </div>
    );
};

export default Home;
