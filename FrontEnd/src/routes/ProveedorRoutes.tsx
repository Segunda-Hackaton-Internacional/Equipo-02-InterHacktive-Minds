import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";


export default function EvaluatorRoutesProovedor() {
    const { user } = useAuthContext()
    console.log("user", user)
    if (!user) {
        return <Navigate to="/auth" />;
    }

    if (user?.type === "PROVEEDOR") {
        return <Outlet />
    }

    return <Navigate to="/no-autorizado" />
}