import { LoginInput, User } from "@/types";
import { FormField } from "@/types/formTypes";
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
    return (<AuthTemplate loginFields={loginFields} 
        registryFields={registryFields} 
        onLogin={function (values: LoginInput): void {
        console.log(values)
    } } onRegister={function (values: User): void {
        console.log(values)
    } } imageBackground={fondoFrutal}>
        
    </AuthTemplate>)
}