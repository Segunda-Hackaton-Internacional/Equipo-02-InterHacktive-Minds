import AuthTemplate from "@/components/templates/AuthTemplate";
import { FormField } from "@/types/formTypes";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const loginFields: FormField[] = [
  { type: "email", key: "email", placeholder: "Ingresa tu correo institucional", required: true },
  { type: "password", key: "password", placeholder: "Ingresa tu contraseña", required: true },
];

const registryFields: FormField[] = [
  { type: "user", key: "name", placeholder: "Ingresa tu nombre", required: true },
  { type: "user", key: "last_name", placeholder: "Ingresa tu apeliido", required: true },
  { type: "email", key: "email", placeholder: "Ingresa tu correo institucional", required: true },
  { type: "password", key: "password", placeholder: "Ingresa tu contraseña", required: true },
];




export default function AuthScreen() {
  const { userType, login, createAccount } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  //esto lo tengo que quitar (es para crear los pdf)

  useEffect(() => {
    if (userType === "EVALUADOR" && location.pathname !== "/estadisticas") {
      navigate("/estadisticas");
    } else if (userType === "INVESTIGADOR" && location.pathname !== "/historial-archivos") {
      navigate("/historial-archivos");
    }
  }, [userType, location.pathname, navigate]);

  // Inicia sesión y deja que el useEffect haga la navegación
  const handleLogin = async (credentials: { email: string; password: string }) => {
    /* generatePdfMutation({
      userName: credentials.email,
      userType: userType || "INVESTIGADOR",
      date: new Date().toLocaleString()
    }); */
    await login(credentials.email, credentials.password);
  };

  const handleRegister = async (data: {
    name: string;
    last_name: string;
    email: string;
    password: string;
  }) => {
    await createAccount(data);
    await login(data.email, data.password);
  };

  return (
    <AuthTemplate
      loginFields={loginFields}
      registryFields={registryFields}
      onLogin={handleLogin}
      onRegister={handleRegister}
    />
  );
}
