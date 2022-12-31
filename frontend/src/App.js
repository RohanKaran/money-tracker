import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { AuthProvider } from "./context/AuthContext";
import { ProSidebarProvider } from "react-pro-sidebar";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} exact />
          </Routes>

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ProSidebarProvider>
                    <HomePage />
                  </ProSidebarProvider>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
