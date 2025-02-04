import React, { ReactNode } from 'react';

interface HowRegisterProps {
  children: ReactNode;
}

const HowRegister: React.FC<HowRegisterProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen">
      {children}
    </div>
  );
};

export default HowRegister;
