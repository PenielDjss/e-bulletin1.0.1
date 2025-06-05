import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register.jsx";
import BulletinsList from "./pages/Bulletins/BulletinsList";
import BulletinDetail from "./pages/Bulletins/BulletinDetail.jsx";
import QRScanPage from "./pages/Bulletins/QRScanPage";
import CongesList from "./pages/Conges/CongesList";
import NewCongeRequest from "./pages/Conges/NewCongeRequest.jsx";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Routes publiques */}
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Register />} />

          {/* Routes privées protégées */}
          <Route element={<ProtectedRoute />}>
            <Route >
              <Route index element={<Navigate to="/bulletins" />} />
              <Route path="/bulletins" element={<BulletinsList />} />
              <Route
                path="/bulletins/:month/:year"
                element={<BulletinDetail />}
              />
              <Route path="/conges" element={<CongesList />} />
              <Route path="/conges/new" element={<NewCongeRequest />} />
              <Route path="/qr-scan" element={<QRScanPage />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
