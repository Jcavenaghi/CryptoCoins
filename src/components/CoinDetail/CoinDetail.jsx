// src/components/CoinDetail.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoinDetail = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching coin details from CoinGecko API');
        }

        const data = await response.json();
        setCoin(data);
      } catch (error) {
        console.error('Error fetching coin details from CoinGecko API', error);
      }
    };

    fetchCoinDetail();
  }, [id]);

  if (!coin) {
    return  <div className=" bg-orange-50 flex items-center justify-center h-screen">
    <RingLoader color="#4A90E2" loading={loading} size={100} />
  </div>
  }

  const handleGoBack = () => {
    navigate(-1); // Navegar hacia atrás
  };

  return (
    <div className="bg-orange-50 p-8 min-h-screen font-bold text-justify">
      {/* Botón "Volver" */}
      <button
        onClick={handleGoBack}
        className="text-blue-500 hover:text-blue-800 text-md font-bold mb-4"
      >
        {'Volver'}
      </button>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img src={coin.image.large} alt={`${coin.name} Logo`} className="w-12 h-12 mr-4" />
          <div>
            <h1 className="text-4xl font-bold ">{coin.name}</h1>
            <p className="text-xl text-gray-600">{coin.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">${coin.market_data.current_price.usd}</p>
          <p
            className={`text-sm ${
              coin.market_data.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {coin.market_data.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Descripción</h2>
        <p className="text-md font-semibold">{coin.description?.en || 'Description not available.'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Información General</h2>
          <p>
            <span className="font-bold">Categoría:</span> {coin.categories?.join(', ') || 'N/A'}
          </p>
          {/* Agrega más información general si está disponible */}
        </div>
      </div>
    </div>
  );
}

export default CoinDetail;
