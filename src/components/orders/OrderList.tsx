import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { type Order } from "@/lib/store";

interface OrderListProps {
  open?: boolean;
  onClose?: () => void;
  orders?: Order[];
  onViewOrder?: (orderId: string) => void;
}

const OrderList = ({
  open = false,
  onClose = () => {},
  orders = [],
  onViewOrder = () => {},
}: OrderListProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>My Orders</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-full px-6 pb-6">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
              <Package className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="font-medium text-lg mb-2">No orders yet</h3>
              <p className="text-gray-500">Your orders will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-card p-4 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">Order #{order.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        ${order.total.toFixed(2)}
                      </div>
                      <span
                        className={`text-sm ${order.status === "delivered" ? "text-green-600" : "text-blue-600"}`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4 overflow-auto pb-2 mb-4">
                    {order.items.map((item) => (
                      <img
                        key={item.id}
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => onViewOrder(order.id)}
                  >
                    View Order Details
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default OrderList;
