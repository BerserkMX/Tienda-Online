import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";
type Color = "slate" | "blue" | "green" | "rose";

interface ThemeState {
  theme: Theme;
  color: Color;
  setTheme: (theme: Theme) => void;
  setColor: (color: Color) => void;
}

export const useThemeStore = create<ThemeState>(
  persist(
    (set) => ({
      theme: "light",
      color: "slate",
      setTheme: (theme) => set({ theme }),
      setColor: (color) => set({ color }),
    }),
    {
      name: "theme-storage",
    },
  ),
);

export const applyTheme = (theme: Theme, color: Color) => {
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
