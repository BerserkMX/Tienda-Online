import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AuthModalProps {
  open?: boolean;
  onClose?: () => void;
  onLogin?: (email: string, password: string) => Promise<void>;
  onSignup?: (email: string, password: string) => Promise<void>;
  onSocialLogin?: (provider: string) => void;
}

const AuthModal = ({
  open = true,
  onClose = () => {},
  onLogin = async () => {},
  onSignup = async () => {},
  onSocialLogin = () => {},
}: AuthModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (type: "login" | "signup") => {
    try {
      setIsLoading(true);
      if (type === "signup" && formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (type === "login") {
        await onLogin(formData.email, formData.password);
      } else {
        await onSignup(formData.email, formData.password);
      }

      setFormData({ email: "", password: "", confirmPassword: "" });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            Welcome
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <Button
                className="w-full"
                onClick={() => handleSubmit("login")}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
              </div>
              <Button
                className="w-full"
                onClick={() => handleSubmit("signup")}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => onSocialLogin("github")}>
            <Github className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline" onClick={() => onSocialLogin("google")}>
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
