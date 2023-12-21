// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          CryptInfo
        </Link>
        <div>
          <Link to="/home" className="text-white mr-4">
            Home
          </Link>
          <Link to="/trending" className="text-white mr-4">
            Trending
          </Link>
          {/* Puedes agregar más enlaces aquí según sea necesario */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
