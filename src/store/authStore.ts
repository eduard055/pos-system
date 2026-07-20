import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {

  username: string;

  password: string;

  role: "Admin" | "Cashier";

}

interface AuthStore {

  currentUser: User | null;

  users: User[];

  login: (
    username: string,
    password: string
  ) => boolean;

  logout: () => void;

}

export const useAuthStore = create<AuthStore>()(

persist(

(set, get) => ({

currentUser: null,

users: [

{

username: "admin",

password: "admin123",

role: "Admin"

},

{

username: "cashier",

password: "cashier123",

role: "Cashier"

}

],

login: (username, password) => {

const user = get().users.find(

u =>

u.username === username &&

u.password === password

);

if (!user) return false;

set({

currentUser: user

});

return true;

},

logout: () =>

set({

currentUser: null

})

}),

{

name: "auth-storage"

}

)

);