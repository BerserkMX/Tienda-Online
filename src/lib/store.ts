import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OrderStatus = "processing" | "shipped" | "delivered";

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  trackingNumber?: string;
  shippingDetails: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
}

interface User {
  email: string;
  name: string;
  avatar?: string;
}

interface StoreState {
  // Auth
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;

  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Theme
  theme: "light" | "dark";
  color: "slate" | "blue" | "green" | "rose";
  setTheme: (theme: "light" | "dark") => void;
  setColor: (color: "slate" | "blue" | "green" | "rose") => void;
}

const applyTheme = (
  theme: "light" | "dark",
  color: "slate" | "blue" | "green" | "rose",
) => {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);

  const colors = {
    slate: {
      primary: "222.2 47.4% 11.2%",
    },
    blue: {
      primary: "221.2 83.2% 53.3%",
    },
    green: {
      primary: "142.1 76.2% 36.3%",
    },
    rose: {
      primary: "346.8 77.2% 49.8%",
    },
  };

  root.style.setProperty("--primary", colors[color].primary);
};

export const useStore = create<StoreState>(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isLoggedIn: false,
      login: async (email: string, password: string) => {
        // Simulated login - in real app this would call an API
        if (email === "prueba" && password === "1234") {
          set({
            user: {
              email,
              name: "Usuario Prueba",
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            },
            isLoggedIn: true,
          });
        } else {
          throw new Error("Invalid credentials");
        }
      },
      signup: async (email: string, password: string) => {
        // Simulated signup - in real app this would call an API
        set({
          user: {
            email,
            name: email.split("@")[0],
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          },
          isLoggedIn: true,
        });
      },
      logout: () => set({ user: null, isLoggedIn: false }),

      // Orders
      orders: [],
      addOrder: (order) => {
        const newOrder: Order = {
          ...order,
          id: `ORD${Math.random().toString(36).substr(2, 9)}`,
          date: new Date().toISOString(),
          status: "processing",
        };
        set((state) => ({ orders: [...state.orders, newOrder] }));

        // Simulate order status changes
        setTimeout(() => {
          get().updateOrderStatus(newOrder.id, "shipped");
          setTimeout(() => {
            get().updateOrderStatus(newOrder.id, "delivered");
          }, 10000); // Delivered after 10 more seconds
        }, 5000); // Shipped after 5 seconds
      },
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order,
          ),
        })),

      // Theme
      theme: "light",
      color: "slate",
      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme, get().color);
      },
      setColor: (color) => {
        set({ color });
        applyTheme(get().theme, color);
      },
    }),
    {
      name: "store",
      onRehydrateStorage: () => (state) => {
        // Apply theme when store is rehydrated
        if (state) {
          applyTheme(state.theme, state.color);
        }
      },
    },
  ),
);
