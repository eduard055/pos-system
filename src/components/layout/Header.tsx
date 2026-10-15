import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  PORTFOLIO_DEMO,
  useAuthStore,
} from "../../store/authStore";
import { useSidebarStore } from "../../store/sidebarStore";

export default function Header() {

  const navigate = useNavigate();

  const currentUser = useAuthStore(
    state => state.currentUser
  );

  const logout = useAuthStore(
    state => state.logout
  );

  const toggleSidebar = useSidebarStore(
    state => state.toggleSidebar
  );

  function handleLogout() {

    logout();

    // TEMPORARY: stay in the app during portfolio demo
    navigate(PORTFOLIO_DEMO ? "/" : "/login");

  }

  return (

    <header className="h-16 bg-white border-b flex items-center justify-between px-6">

      {/* Left Side */}

      <div className="flex items-center gap-4">

        <button

          onClick={toggleSidebar}

          className="
          p-2
          rounded-lg
          hover:bg-slate-100
          transition
          "

        >

          <Menu size={24} />

        </button>

        <h1 className="text-xl font-bold text-slate-800">

          POS Pro

        </h1>

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-3">

          <div
            className="
            w-10
            h-10
            rounded-full
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            font-bold
            "
          >

            {currentUser?.username.charAt(0).toUpperCase()}

          </div>

          <div>

            <p className="font-semibold">

              {currentUser?.username}

            </p>

            <p className="text-xs uppercase text-slate-500">

              {currentUser?.role}

            </p>

          </div>

        </div>

        <button

          onClick={handleLogout}

          className="
          bg-red-600
          hover:bg-red-700
          text-white
          px-4
          py-2
          rounded-lg
          transition
          "

        >

          Logout

        </button>

      </div>

    </header>

  );

}