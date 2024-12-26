import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isOnSale?: boolean;
  salePrice?: number;
}

interface CartSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: CartItem[];
  onCheckout?: () => void;
  onRemoveItem?: (productId: string) => void;
  onIncreaseQuantity?: (productId: string) => void;
  onDeleteItem?: (productId: string) => void;
}

const CartSidebar = ({
  isOpen = true,
  onClose = () => {},
  items = [],
  onCheckout = () => {},
  onRemoveItem = () => {},
  onIncreaseQuantity = () => {},
  onDeleteItem = () => {},
}: CartSidebarProps) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      (item.isOnSale ? item.salePrice || item.price : item.price) *
        item.quantity,
    0,
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[400px] bg-white">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="font-semibold text-lg">
                Shopping Cart ({totalItems})
              </h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <Separator />

          {/* Cart Items */}
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center flex-col gap-4">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
              <p className="text-gray-500">Your cart is empty</p>
              <Button variant="outline" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ScrollArea className="flex-1 py-4 pr-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 group relative bg-white rounded-lg p-3 hover:shadow-md transition-shadow"
                  >
                    <div className="h-24 w-24 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{item.name}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => onDeleteItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-sm min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onIncreaseQuantity(item.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-1">
                        {item.isOnSale ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm line-through text-gray-400">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <span className="font-medium text-red-600">
                              $
                              {(
                                (item.salePrice || item.price) * item.quantity
                              ).toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {/* Footer */}
          {items.length > 0 && (
            <div className="py-4">
              <Separator className="mb-4" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <Button className="w-full" onClick={onCheckout}>
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
