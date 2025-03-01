import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

interface ProtectedLayoutProps {
  requiredPrivileges?: string[];
  redirectUrl?: string;
}

const ProtectedLayout = ({
  requiredPrivileges,
  redirectUrl,
}: ProtectedLayoutProps) => {
  const authState = useAuth();

  if (!authState?.isAuthenticated) {
    return <Navigate to={redirectUrl || "/"} replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
