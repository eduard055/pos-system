import { Navigate } from "react-router-dom";
import {
  PORTFOLIO_DEMO,
  useAuthStore,
} from "../../store/authStore";

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

  // TEMPORARY: skip login redirect for portfolio demo
  if (!currentUser && !PORTFOLIO_DEMO) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/pos" replace />;
  }

  return <>{children}</>;
}