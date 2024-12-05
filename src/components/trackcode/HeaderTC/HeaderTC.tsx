import Image from "next/image";
import { Button } from "@mui/material";

interface HeaderProps {
    isLoggedIn: boolean;
    username?: string;
}

const HeaderTC: React.FC<HeaderProps> = ({ isLoggedIn, username }) => {
  return (
    <header className="bg-blue-50 py-4">

        <div className="container mx-auto flex justify-around items-center">
            <h1 className="text-2xl font-bold text-gray-800">
                Veloway
            </h1>

            <nav className="space-x-6 text-gray-600">
                <a href="/" className="hover:text-gray-800">Inicio</a>
                <a href="#" className="hover:text-gray-800">Realizar Envío</a>
                <a href="#" className="hover:text-gray-800">Conductores</a>
                <a href="#" className="hover:text-gray-800">Api</a>
            </nav>

            <nav>
                {isLoggedIn ? (
                    <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                            src="/images/fotoPerfilvwloway.jpg"
                            alt="Foto de perfil"
                            width={48}
                            height={48}
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <div className="text-lg text-gray-800">{username}</div>
                        <a href="/mi-cuenta" className="text-blue-500 text-sm hover:underline">
                        Mi Cuenta
                        </a>
                        </div>
                     </div>
                ): 
                (
                    <div className="container mx-auto flex gap-2 items-center list-none">
                        <li><a className="hover:text-gray-800" href="/auth/login">Iniciar Sesion</a></li>
                        <li><a href="#">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                backgroundColor: 'primary', 
                                color: 'secondary', 
                                '&:hover': { backgroundColor: 'tertiary' },  
                                textTransform: 'none'
                              }}
                        >
                        Registrarse
                        </Button>
                        </a></li>
                    </div>
                )}
            </nav>

            {/* <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                        src="/images/fotoPerfilvwloway.jpg"
                        alt="Foto de perfil"
                        width={48}
                        height={48}
                        className="object-cover"
                    />
                </div>
                <div>
                    <div className="text-lg text-gray-800">Nombre de Usuario</div>
                    <a href="/mi-cuenta" className="text-blue-500 text-sm hover:underline">
                        Mi Cuenta
                    </a>
                </div>
            </div> */}
        </div>
    </header>

  )
}

export default HeaderTC;