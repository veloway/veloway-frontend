"use client";

import React, { useState } from 'react';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

const ResetPassword = () => {

  const [email, setEmail] = useState('');
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await authService.requestPasswordReset(email);
      router.push(`http://localhost:3000/auth/getNewPassword`);
    } catch (err: any) {
      alert("Error en el envio de codigo. Revisa los datos e intenta nuevamente.");
    }
  };

    return (
        <>
            <h2 className="text-3xl font-bold text-center mb-6">Recuperar contraseña</h2>
            <h4 className="text-xl text-center mb-6"> Ingrese un correo electronico, le enviaremos un codigo para que pueda reestablecer su contraseña</h4>
            <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="mb-1 font-semibold" htmlFor="email">Mail</label>
        <input
          type="email"
          id="email"
          placeholder="Correo electrónico"
          required
          className="mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        />

        <button type='submit' className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Enviar codigo de recuperacion
        </button>
        </form>
        </>
    );
};

export default ResetPassword;
