import Link from 'next/link';
import React, { useState } from 'react';

const UserOrDriver = () => {
  return (
    <div className="flex w-full h-full flex-row">
      {/* Lado Izquierdo */}
      <div className="w-1/2 h-full relative overflow-hidden cursor-pointer">
        <Link href="/auth/clientRegister" passHref>
          <div className="relative w-full h-full overflow-hidden transition-transform duration-300 ease-in-out hover:scale-110">
            <img
              src="/images/userWoman.jpg"
              alt="Cliente"
              className="w-full h-full object-cover "
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-white text-4xl font-bold">Cliente</h1>
            </div>
          </div>
        </Link>
      </div>

      {/* Lado Derecho */}
      <div className="w-1/2 h-full relative overflow-hidden cursor-pointer">
        <Link href="/auth/driverRegister" passHref>
        <div className="relative w-full h-full overflow-hidden transition-transform duration-300 ease-in-out hover:scale-110">
            <img
              src="/images/driver.jpg"
              alt="Conductor"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-white text-4xl font-bold">Conductor</h1>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserOrDriver;
