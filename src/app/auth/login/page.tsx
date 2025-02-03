"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useRegistroStoreDto } from '@/stores/userRegisterStore';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();
  const {setAddressData , setUserData} = useRegistroStoreDto()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await authService.login(formData);

      console.log('Login exitoso:', data);

      const { usuarioDTO, domicilioDTO } = data;

      if (!usuarioDTO || !domicilioDTO) {
        console.error('Datos incompletos:', data);
        throw new Error('Datos del usuario o domicilio faltantes');
      }
    
      console.log('Configurando datos de la dirección...');
      setAddressData({
        calle: domicilioDTO.calle,
        numero: domicilioDTO.numero,
        descripcion: domicilioDTO.descripcion,
        piso: domicilioDTO.piso,
        depto: domicilioDTO.depto,
        localidadID: domicilioDTO.localidadID,
      });
    
      console.log('Configurando datos del usuario...');
      setUserData({
        dni: usuarioDTO.dni,
        email: usuarioDTO.email,
        fechaNac: usuarioDTO.fechaNac,
        nombre: usuarioDTO.nombre,
        apellido: usuarioDTO.apellido,
        esConductor: usuarioDTO.esConductor,
        telefono: usuarioDTO.telefono,
        apiKey: usuarioDTO.apiKey,
      });
    
      console.log('Redirigiendo a la página principal...');
      router.push(`http://localhost:3000/client/dashboard`);
    } catch (error) {
      alert("Error de autenticación. Revisa tus credenciales e intenta nuevamente.");
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6">¡Bienvenido de vuelta!</h2>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="mb-1 font-semibold" htmlFor="email">Mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Correo electrónico"
          required
          value={formData.email}
          onChange={handleChange}
          className="mb-4 p-2 border rounded"
        />

        <label className="mb-1 font-semibold" htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Contraseña"
          required
          value={formData.password}
          onChange={handleChange}
          className="mb-4 p-2 border rounded"
        />


        <button type="submit" className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600">
          Iniciar Sesión
        </button>
      </form>

      {/* Enlace para recuperar contraseña */}
      <div className="text-center mb-6">
        <a href="/auth/resetPassword" className="text-sm text-blue-600 hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {/* Sección de registro */}
      <div className="text-center">
        <p className="mb-2">¿No tienes cuenta? ¡Regístrate!</p>

        <div className="flex justify-center gap-4 mb-4">
          <a href="/auth/clientRegister" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            como Cliente
          </a>
          <a href="/auth/driverRegister" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            como Conductor
          </a>
        </div>
      </div>
    </>

  );

}
export default Login;
