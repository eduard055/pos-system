import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div
        className="
        flex
        flex-col
        flex-1
        transition-all
        duration-300
        "
      >

        <Header />

        <main className="flex-1 p-6 overflow-auto">

          <Outlet />

        </main>

      </div>

    </div>
  );
}