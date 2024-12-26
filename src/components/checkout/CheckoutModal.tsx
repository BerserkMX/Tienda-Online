import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isOnSale?: boolean;
  salePrice?: number;
}

interface CheckoutModalProps {
  open?: boolean;
  onClose?: () => void;
  items?: CheckoutItem[];
  onCompleteCheckout?: (shippingDetails: any) => void;
  isLoggedIn?: boolean;
  onLoginRequired?: () => void;
}

const CheckoutModal = ({
  open = false,
  onClose = () => {},
  items = [],
  onCompleteCheckout = () => {},
  isLoggedIn = false,
  onLoginRequired = () => {},
}: CheckoutModalProps) => {
  const [step, setStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    paymentMethod: "card",
  });

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      (item.isOnSale ? item.salePrice || item.price : item.price) *
        item.quantity,
    0,
  );
  const shipping = 10;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }
    if (step === 1) {
      setStep(2);
    } else {
      onCompleteCheckout(shippingDetails);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Shipping Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        required
                        value={shippingDetails.fullName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={shippingDetails.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        required
                        value={shippingDetails.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        value={shippingDetails.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        required
                        value={shippingDetails.postalCode}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        required
                        value={shippingDetails.country}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Payment Method</h3>
                  <RadioGroup
                    value={shippingDetails.paymentMethod}
                    onValueChange={(value) =>
                      setShippingDetails((prev) => ({
                        ...prev,
                        paymentMethod: value,
                      }))
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Order Summary</h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center"
                      >
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span>
                          $
                          {(
                            (item.isOnSale
                              ? item.salePrice || item.price
                              : item.price) * item.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
              )}
              <Button type="submit" className="ml-auto">
                {step === 1 ? "Continue to Payment" : "Place Order"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
