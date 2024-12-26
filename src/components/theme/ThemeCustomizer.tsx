import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Palette } from "lucide-react";

type Theme = "light" | "dark";
type Color = "slate" | "blue" | "green" | "rose";

interface ThemeCustomizerProps {
  theme?: Theme;
  color?: Color;
  onThemeChange?: (theme: Theme) => void;
  onColorChange?: (color: Color) => void;
}

const colors: { name: Color; class: string }[] = [
  { name: "slate", class: "bg-slate-600" },
  { name: "blue", class: "bg-blue-600" },
  { name: "green", class: "bg-green-600" },
  { name: "rose", class: "bg-rose-600" },
];

const ThemeCustomizer = ({
  theme = "light",
  color = "slate",
  onThemeChange = () => {},
  onColorChange = () => {},
}: ThemeCustomizerProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="p-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Theme</span>
            <div className="flex gap-1">
              <Button
                variant={theme === "light" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onThemeChange("light")}
              >
                <Sun className="h-4 w-4" />
              </Button>
              <Button
                variant={theme === "dark" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onThemeChange("dark")}
              >
                <Moon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="p-2 space-y-2">
          <span className="text-sm font-medium">Color</span>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((c) => (
              <button
                key={c.name}
                className={`h-8 w-full rounded-md transition-all ${c.class} ${color === c.name ? "ring-2 ring-offset-2 ring-offset-background" : "opacity-50 hover:opacity-100"}`}
                onClick={() => onColorChange(c.name)}
              />
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeCustomizer;
