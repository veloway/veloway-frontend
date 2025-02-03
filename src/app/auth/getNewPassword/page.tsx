'use client'

import React, { useState } from 'react';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

const ResetPassword = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden. Intenta de nuevo.');
      return;
    }

    try {
      await authService.resetPassword(code, newPassword);
      alert('Contraseña restablecida con éxito. Redirigiendo al login...');
      router.push('/auth/login'); // Redirige al login después del éxito
    } catch (err: any) {
      alert("Error al restablecer la contraseña. Revisa los datos e intenta nuevamente.");
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6">Recuperar contraseña</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="mb-1 font-semibold" htmlFor="code">Código de recuperación</label>
        <input
          id="code"
          placeholder="Código de recuperación"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          className="mb-4 p-2 border rounded"
        />

        <label className="mb-1 font-semibold" htmlFor="newPassword">Nueva contraseña</label>
        <input
          type="password"
          id="newPassword"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="mb-4 p-2 border rounded"
        />

        <label className="mb-1 font-semibold" htmlFor="confirmPassword">Repetir nueva contraseña</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Repetir nueva contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="mb-4 p-2 border rounded"
        />

        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Restablecer contraseña
        </button>
      </form>
    </>
  );
};

export default ResetPassword;
