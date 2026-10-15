import { Navigate } from "react-router-dom";
import {
  PORTFOLIO_DEMO,
  useAuthStore,
} from "../../../store/authStore";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children
}: Props) {

  const currentUser = useAuthStore(
    state => state.currentUser
  );

  // TEMPORARY: skip login gate for portfolio demo
  if (PORTFOLIO_DEMO) {
    return children;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;

}