import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children
}: Props) {

  const currentUser = useAuthStore(
    state => state.currentUser
  );


  console.log("PROTECTED CHECK:", currentUser);


  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }


  return children;

}