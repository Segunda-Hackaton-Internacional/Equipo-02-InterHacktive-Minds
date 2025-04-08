import { LoadingFallback } from "@/components/molecules/LoadingFallback";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

// componentes principales
const Auth = lazy(() => import("../components/screens/AuthScreen"));
const Layout = lazy(() => import("../components/templates/Layout"));
const Dashboard = lazy(() => import("../components/screens/DashboardScreen"));
const FileHistory = lazy(() => import("../components/screens/FileHistoryScreen"));
const Evaluation = lazy(() => import("../components/screens/EvaluationScreen"));
const UnauthorizedErrorScreen = lazy(() => import("../components/screens/errors/401"));

// rutas de rol
const EvaluatorRoutes = lazy(() => import("./EvaluatorRoutes"));
const ResearcherRoutes = lazy(() => import("./ResearcherRoutes"));
// rutas de ajustes
const Settings = lazy(() => import("../components/screens/settings/SettingsScreen"));
const Appearance = lazy(() => import("../components/screens/settings/AppearanceScreen"));
const Account = lazy(() => import("../components/screens/settings/AccountScreen"));
const Prompts = lazy(() => import("../components/screens/settings/PromptsScreen"));
export const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/no-autorizado" element={<UnauthorizedErrorScreen />} />

          <Route path="/" element={<Layout />}>
            <Route path="/ajustes" element={<Settings />} >
              <Route path="apariencia" element={<Appearance />} />
              <Route path="cuenta" element={<Account />} />
              <Route path="prompts" element={<Prompts />} />
            </Route>
            {/* Rutas para evaluadores */}
            <Route path="estadisticas" element={<Dashboard />} />
            <Route path="historial-archivos-evaluados" element={<FileHistory />} />
            {/* Rutas para investigadores */}
            <Route path="evaluacion" element={<Evaluation />} />
            <Route path="historial-archivos" element={<FileHistory />} />
            {/* </Route> */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
