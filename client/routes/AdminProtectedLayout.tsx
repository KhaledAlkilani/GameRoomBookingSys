import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { ReactNode } from "react";

const AdminProtectedLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  console.log(
    "AdminProtectedLayout => isAuthenticated:",
    isAuthenticated,
    "isAdmin:",
    isAdmin
  );

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default AdminProtectedLayout;
