// auth/layout.tsx
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Button, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Mitad izquierda con la imagen (sin scroll) */}
      <div className="w-1/2 h-screen bg-cover bg-center" style={{ backgroundImage: `url('/images/hombreSesion.jpg')` }}>
        {/* Imagen fija */}
      </div>

      <div className="w-1/2 h-screen flex justify-center items-center bg-gray-100">
        <Button
         LinkComponent={Link}
         href="/"
         className='absolute top-4 right-4 rounded-md'
         color='primary'
         variant='contained'
        > 
          <HomeIcon className='text-2xl'/>
        </Button>
        <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
