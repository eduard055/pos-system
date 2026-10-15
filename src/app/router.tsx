import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import POS from "../features/pos/pages/POS";
import Inventory from "../features/inventory/pages/Inventory";
import Reports from "../features/reports/pages/Reports";
import Settings from "../features/settings/pages/Settings";
import Login from "../features/auth/pages/Login";

import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import { PORTFOLIO_DEMO } from "../store/authStore";


export const router = createBrowserRouter([

  {
    path: "/login",
    // TEMPORARY: skip login page for portfolio demo
    element: PORTFOLIO_DEMO ? <Navigate to="/" replace /> : <Login />,
  },


  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),

    children: [

      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "pos",
        element: <POS />,
      },

      {
        path: "inventory",
        element: <Inventory />,
      },

      {
        path: "reports",
        element: <Reports />,
      },

      {
        path: "settings",
        element: <Settings />,
      },

    ],
  },

]);