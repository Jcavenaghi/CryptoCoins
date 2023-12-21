// src/components/Trending.js

import React, { useState, useEffect } from 'react';
import { FaRocket } from 'react-icons/fa';

function Trending() {
  const [trendingCoins, setTrendingCoins] = useState([]);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/search/trending'
        );
        if (!response.ok) {
          throw new Error('Error fetching trending coins from CoinGecko API');
        }

        const data = await response.json();
        setTrendingCoins(data.coins || []);
      } catch (error) {
        console.error('Error fetching trending coins from CoinGecko API', error);
      }
    };

    fetchTrendingCoins();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-sans font-bold mb-8">Monedas en Tendencia</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {trendingCoins.map((coin) => (
          <div
            key={coin.item.id}
            className="bg-orange-50 p-4 rounded-md shadow-md hover:shadow-2xl transition duration-300"
          >
            <img
              src={coin.item.small}
              alt={`${coin.item.name} Logo`}
              className="w-8 h-8 mb-2"
            />
            <h2 className="text-lg font-bold mb-2">{coin.item.name}</h2>
            <p className="text-gray-600 mb-4">{coin.item.symbol}</p>
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">{coin.item.data.price}</p>
              <div className="text-sm">
              <span
                className={`${
                    coin.item.data.price_change_percentage_24h.usd >= 0 ? 'text-green-500' : 'text-red-500'
                } mr-1`}
                >
                {coin.item.data.price_change_percentage_24h.usd >= 0 ? '+' : ''}
                {coin.item.data.price_change_percentage_24h.usd !== undefined
                    ? coin.item.data.price_change_percentage_24h.usd.toFixed(2)
                    : 'N/A'}%
                </span>
                {coin.item.data.price_change_percentage_24h.usd >= 0 ? (
                    <FaRocket className="text-green-500 w-4 h-4 inline-block" />
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trending;
