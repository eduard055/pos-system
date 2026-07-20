import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";

export default function Users() {

  const users = useAuthStore(
    state => state.users
  );

  const addUser = useAuthStore(
    state => state.addUser
  );

  const deleteUser = useAuthStore(
    state => state.deleteUser
  );

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState<
    "Admin" | "Cashier"
  >("Cashier");

  function createUser() {

    if (!username.trim() || !password.trim()) {
      alert("Complete all fields.");
      return;
    }

    const exists = users.some(
      user =>
        user.username.toLowerCase() ===
        username.toLowerCase()
    );

    if (exists) {
      alert("Username already exists.");
      return;
    }

    addUser({
      id: Date.now(),
      username,
      password,
      role
    });

    setUsername("");
    setPassword("");
    setRole("Cashier");

    alert("User created successfully!");
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        User Management
      </h1>

      <div className="bg-white rounded-xl shadow p-6 max-w-xl">

        <input
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="border p-3 rounded-lg w-full mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="border p-3 rounded-lg w-full mb-3"
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value as
                | "Admin"
                | "Cashier"
            )
          }
          className="border p-3 rounded-lg w-full mb-3"
        >
          <option value="Cashier">
            Cashier
          </option>

          <option value="Admin">
            Admin
          </option>
        </select>

        <button
          onClick={createUser}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          Create User
        </button>

      </div>

      <div className="mt-6 bg-white rounded-xl shadow p-6">

        <h2 className="font-bold text-xl mb-4">
          Existing Users
        </h2>

        {users.map(user => (

          <div
            key={user.id}
            className="flex justify-between items-center border-b py-3"
          >

            <div>

              <p className="font-bold">
                {user.username}
              </p>

              <p className="text-sm text-gray-500">
                {user.role}
              </p>

            </div>

            <button
              onClick={() =>
                deleteUser(user.id)
              }
              disabled={user.username === "admin"}
              className={`px-3 py-1 rounded text-white ${
                user.username === "admin"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}