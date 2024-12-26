import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, Tag } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import MobileMenu from "./MobileMenu";
import ThemeCustomizer from "../theme/ThemeCustomizer";

interface HeaderProps {
  cartItemCount?: number;
  isLoggedIn?: boolean;
  userName?: string;
  onSearchChange?: (searchTerm: string) => void;
  onCartClick?: () => void;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onToggleSale?: () => void;
  showOnSale?: boolean;
  categories?: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  onLogout?: () => void;
  onViewOrders?: () => void;
  theme?: "light" | "dark";
  onThemeChange?: (theme: "light" | "dark") => void;
  color?: "slate" | "blue" | "green" | "rose";
  onColorChange?: (color: "slate" | "blue" | "green" | "rose") => void;
}

const Header = ({
  cartItemCount = 0,
  isLoggedIn = false,
  userName = "Guest User",
  onSearchChange = () => {},
  onCartClick = () => {},
  onLoginClick = () => {},
  onSignupClick = () => {},
  onToggleSale = () => {},
  showOnSale = false,
  categories = [],
  selectedCategory = "",
  onCategoryChange = () => {},
  onLogout = () => {},
  onViewOrders = () => {},
  theme = "light",
  onThemeChange = () => {},
  color = "slate",
  onColorChange = () => {},
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Mobile Menu */}
          <MobileMenu
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            isLoggedIn={isLoggedIn}
            userName={userName}
            onLoginClick={onLoginClick}
            onSignupClick={onSignupClick}
            onLogout={onLogout}
            onViewOrders={onViewOrders}
          />

          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold">
              Store
            </a>
          </div>

          {/* Navigation - Desktop Only */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {selectedCategory || "All Categories"}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4">
                    <NavigationMenuLink
                      className={`cursor-pointer ${!selectedCategory ? "font-bold" : ""}`}
                      onClick={() => onCategoryChange("")}
                    >
                      All Categories
                    </NavigationMenuLink>
                    {categories.map((category) => (
                      <NavigationMenuLink
                        key={category}
                        className={`cursor-pointer ${selectedCategory === category ? "font-bold" : ""}`}
                        onClick={() => onCategoryChange(category)}
                      >
                        {category}
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar and Sale Toggle - Desktop Only */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 items-center gap-2">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Search products..."
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button
              variant={showOnSale ? "default" : "outline"}
              size="sm"
              onClick={onToggleSale}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Tag className="h-4 w-4" />
              On Sale
            </Button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Theme Customizer */}
            <ThemeCustomizer
              theme={theme}
              color={color}
              onThemeChange={onThemeChange}
              onColorChange={onColorChange}
            />

            {/* Auth - Desktop Only */}
            <div className="hidden md:flex items-center gap-2">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>{userName}</DropdownMenuItem>
                    <DropdownMenuItem onClick={onViewOrders}>
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={onLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={onLoginClick}>
                    Login
                  </Button>
                  <Button onClick={onSignupClick}>Sign up</Button>
                </div>
              )}
            </div>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-2">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
