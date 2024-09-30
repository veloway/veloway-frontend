
import React, { PropsWithChildren } from 'react';

const VehiculoLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div>
      <header className="bg-blue-500 p-4 text-white">
        <h1 className="text-2xl text-center">Vehículos asociados al Conductor</h1>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default VehiculoLayout;
