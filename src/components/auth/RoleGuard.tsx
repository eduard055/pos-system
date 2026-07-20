import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

interface Props {
  children: React.ReactNode;
  allowedRoles: ("Admin" | "Cashier")[];
}

export default function RoleGuard({
  children,
  allowedRoles,
}: Props) {

  const currentUser = useAuthStore(
    (state) => state.currentUser
  );

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/pos" replace />;
  }

  return <>{children}</>;
}