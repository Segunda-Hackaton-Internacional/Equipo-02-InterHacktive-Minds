import { useAuthContext } from "@/context/AuthContext";
import { User } from "@/types";
import { FormField } from "@/types/formTypes";
import { useNavigate } from "react-router-dom";
import fondoFrutal from "../../assets/agricultorFondo.jpg";
import AuthTemplate from "../templates/AuthTemplate";

const loginFields: FormField[] = [
  { type: 'email', key: 'email', placeholder: 'Correo', required: true },
  { type: 'password', key: 'password', placeholder: 'Contraseña', required: true },
];

const registryFields: FormField[] = [
  { type: 'email', key: 'email', placeholder: 'Correo', required: true },
  { type: 'password', key: 'password', placeholder: 'Contraseña', required: true },
];

export default function AuthFarmerScreen(){

  const {login, createProviderAccount} = useAuthContext();

  const navigate = useNavigate();

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    await login(email, password);
    navigate('/proveedorProductos');
    
  };

  const handleRegister = async (user: User) => {
    await createProviderAccount(user.email, user.password);
    
  };


    return (<AuthTemplate loginFields={loginFields} 
        registryFields={registryFields} 
        onLogin={handleLogin} onRegister={handleRegister} imageBackground={fondoFrutal}>
        
    </AuthTemplate>)
}