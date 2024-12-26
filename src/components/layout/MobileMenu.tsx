import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface MobileMenuProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  isLoggedIn: boolean;
  userName?: string;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogout: () => void;
}

const MobileMenu = ({
  categories,
  selectedCategory,
  onCategoryChange,
  isLoggedIn,
  userName = "User",
  onLoginClick,
  onSignupClick,
  onLogout,
}: MobileMenuProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-4 space-y-4">
            {isLoggedIn ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    {userName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{userName}</p>
                    <Button
                      variant="link"
                      className="p-0 h-auto"
                      onClick={onLogout}
                    >
                      Sign out
                    </Button>
                  </div>
                </div>
                <Separator />
              </div>
            ) : (
              <div className="space-y-2">
                <Button
                  className="w-full"
                  onClick={() => {
                    onLoginClick();
                    setOpen(false);
                  }}
                >
                  Sign in
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    onSignupClick();
                    setOpen(false);
                  }}
                >
                  Create account
                </Button>
                <Separator className="my-4" />
              </div>
            )}

            <div className="space-y-4">
              <h3 className="font-medium">Categories</h3>
              <div className="space-y-2">
                <Button
                  variant={!selectedCategory ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    onCategoryChange("");
                    setOpen(false);
                  }}
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "secondary" : "ghost"
                    }
                    className="w-full justify-start"
                    onClick={() => {
                      onCategoryChange(category);
                      setOpen(false);
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {isLoggedIn && (
              <>
                <Separator />
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    My Orders
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Help & Support
                  </Button>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
