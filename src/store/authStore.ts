import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: number;
  username: string;
  password: string;
  role: "Admin" | "Cashier";
}

interface AuthStore {
  currentUser: User | null;

  users: User[];

  login: (username: string, password: string) => boolean;

  logout: () => void;

  addUser: (user: User) => void;

  updateUser: (id: number, user: Partial<User>) => void;

  deleteUser: (id: number) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      currentUser: null,

      users: [
        {
          id: 1,
          username: "admin",
          password: "admin123",
          role: "Admin",
        },
        {
          id: 2,
          username: "cashier",
          password: "cashier123",
          role: "Cashier",
        },
      ],

      login: (username, password) => {
        const user = get().users.find(
          (u) =>
            u.username === username &&
            u.password === password
        );

        if (!user) return false;

        set({
          currentUser: user,
        });

        return true;
      },

      logout: () =>
        set({
          currentUser: null,
        }),

      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),

      updateUser: (id, user) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id
              ? {
                  ...u,
                  ...user,
                }
              : u
          ),
        })),

      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter(
            (u) => u.id !== id
          ),
        })),
    }),
    {
      name: "auth-storage",
    }
  )
);