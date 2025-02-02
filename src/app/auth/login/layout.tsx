// auth/layout.tsx
import React, { ReactNode } from 'react';

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
      {/* Mitad derecha con scroll solo en el formulario */}
      <div className="w-1/2 h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
