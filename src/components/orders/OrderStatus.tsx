import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MessageCircle, Package, Truck, CheckCircle2 } from "lucide-react";

export type OrderStatus = "processing" | "shipped" | "delivered";

interface Order {
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
}

interface OrderStatusProps {
  open?: boolean;
  onClose?: () => void;
  order?: Order;
  onContactSupport?: () => void;
}

const statusSteps = [
  { status: "processing", icon: Package, label: "Order Processing" },
  { status: "shipped", icon: Truck, label: "Order Shipped" },
  { status: "delivered", icon: CheckCircle2, label: "Order Delivered" },
];

const OrderStatus = ({
  open = false,
  onClose = () => {},
  order = {
    id: "ORD123",
    date: new Date().toISOString(),
    status: "processing" as OrderStatus,
    items: [],
    total: 0,
  },
  onContactSupport = () => {},
}: OrderStatusProps) => {
  const currentStepIndex = statusSteps.findIndex(
    (step) => step.status === order.status,
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Order Status - #{order.id}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-full px-6 pb-6">
          <div className="space-y-6">
            {/* Status Timeline */}
            <div className="relative pt-8">
              <div className="absolute left-8 top-0 h-full w-px bg-border" />
              <div className="space-y-8">
                {statusSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index <= currentStepIndex;
                  return (
                    <div
                      key={step.status}
                      className={`relative flex items-center ${isActive ? "text-primary" : "text-muted-foreground"}`}
                    >
                      <div
                        className={`absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${isActive ? "bg-primary border-primary" : "bg-background border-muted-foreground"}`}
                      />
                      <Icon className="h-6 w-6 mr-4" />
                      <span className="font-medium">{step.label}</span>
                      {step.status === order.status && (
                        <span className="ml-auto text-sm text-muted-foreground">
                          Current Status
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Order Details */}
            <div className="space-y-4">
              <h3 className="font-semibold">Order Details</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Order Date: {new Date(order.date).toLocaleDateString()}
                </p>
                {order.trackingNumber && (
                  <p className="text-sm text-muted-foreground">
                    Tracking Number: {order.trackingNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4">
              <h3 className="font-semibold">Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Total */}
            <div className="flex justify-between items-center font-semibold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>

            {/* Contact Support */}
            <div className="pt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={onContactSupport}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default OrderStatus;
