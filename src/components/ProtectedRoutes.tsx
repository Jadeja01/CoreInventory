import { Navigate, Outlet } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout"; // Adjust path if necessary

export const ProtectedRoute = () => {
  // 1. Check if the user is logged in
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // 2. If NOT logged in, redirect them to the sign-in page immediately
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // 3. If they ARE logged in, wrap the requested page in your Sidebar Layout
  return (
    <AppLayout>
      <Outlet /> {/* This renders whatever page they were trying to go to */}
    </AppLayout>
  );
};
