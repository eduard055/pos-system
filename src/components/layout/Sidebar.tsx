import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  BarChart3,
  Settings,
} from "lucide-react";

import { useAuthStore } from "../../store/authStore";
import { useSidebarStore } from "../../store/sidebarStore";

export default function Sidebar() {

  const currentUser = useAuthStore(
    (state) => state.currentUser
  );

  const collapsed = useSidebarStore(
    (state) => state.collapsed
  );


  const menu = [

    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={22} />,
      roles: ["admin"],
    },


    {
      name: "POS",
      path: "/pos",
      icon: <ShoppingCart size={22} />,
      roles: ["admin", "cashier"],
    },


    {
      name: "Inventory",
      path: "/inventory",
      icon: <Package size={22} />,
      roles: ["admin"],
    },


    {
      name: "Reports",
      path: "/reports",
      icon: <BarChart3 size={22} />,
      roles: ["admin"],
    },


    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={22} />,
      roles: ["admin"],
    },

  ];


  const filteredMenu = menu.filter(item =>
    item.roles.includes(
      currentUser?.role.toLowerCase() ?? ""
    )
  );


  return (

    <aside
      className={`
      bg-slate-900
      text-white
      min-h-screen
      flex
      flex-col
      transition-all
      duration-300
      ${collapsed ? "w-20" : "w-64"}
      `}
    >

      <div className="border-b border-slate-700 p-6">

        {!collapsed ? (

          <h1 className="text-2xl font-bold">
            POS PRO
          </h1>

        ) : (

          <h1 className="text-2xl font-bold text-center">
            P
          </h1>

        )}

      </div>


      {!collapsed && (

        <div className="px-6 py-4 border-b border-slate-700">

          <p className="text-xs text-slate-400">
            Logged in as
          </p>


          <p className="font-bold">
            {currentUser?.username}
          </p>


          <span className="text-xs bg-blue-600 px-3 py-1 rounded-full">
            {currentUser?.role.toUpperCase()}
          </span>


        </div>

      )}


      <nav className="flex flex-col gap-2 p-3 flex-1">

        {filteredMenu.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}

            className={({ isActive }) =>
              `
              flex
              items-center
              gap-3
              rounded-lg
              p-3
              transition

              ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }

              `
            }

          >

            {item.icon}


            {!collapsed && (

              <span>
                {item.name}
              </span>

            )}


          </NavLink>

        ))}


      </nav>


    </aside>

  );

}