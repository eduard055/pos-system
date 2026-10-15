import { create } from "zustand";
import { persist } from "zustand/middleware";

// TEMPORARY: set to false to restore the login page
export const PORTFOLIO_DEMO = true;

export interface User {
  id: number;
  username: string;
  password: string;
  role: "Admin" | "Cashier";
}

const DEMO_ADMIN: User = {
  id: 1,
  username: "admin",
  password: "admin123",
  role: "Admin",
};

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
      currentUser: PORTFOLIO_DEMO ? DEMO_ADMIN : null,

      users: [
        DEMO_ADMIN,
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
          // Keep demo session alive for portfolio viewing
          currentUser: PORTFOLIO_DEMO ? DEMO_ADMIN : null,
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
      onRehydrateStorage: () => (state) => {
        if (PORTFOLIO_DEMO && state) {
          state.currentUser = DEMO_ADMIN;
        }
      },
    }
  )
);