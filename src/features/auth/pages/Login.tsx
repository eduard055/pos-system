import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

export default function Login() {

  const navigate = useNavigate();

  const login = useAuthStore(
    state => state.login
  );

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {

    e.preventDefault();

    const success = login(
      username,
      password
    );

    if (!success) {

      setError("Invalid username or password.");

      return;

    }

    const currentUser =
      useAuthStore.getState().currentUser;

    if (currentUser?.role === "Admin") {

      navigate("/");

    } else {

      navigate("/pos");

    }

  }

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="
        bg-white
        w-[420px]
        rounded-3xl
        shadow-xl
        p-10
        space-y-6
        "
      >

        <div className="text-center">

          <h1 className="text-4xl font-bold">
            POS PRO
          </h1>

          <p className="text-slate-500 mt-2">
            Point of Sale Management System
          </p>

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            Username
          </label>

          <input
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="
            border
            rounded-xl
            w-full
            p-3
            "
            placeholder="Enter username"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
            border
            rounded-xl
            w-full
            p-3
            "
            placeholder="Enter password"
          />

        </div>

        {error && (

          <p className="text-red-600 text-sm">
            {error}
          </p>

        )}

        <button
          type="submit"
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          w-full
          py-3
          rounded-xl
          font-bold
          "
        >
          Login
        </button>

      </form>

    </div>

  );

}