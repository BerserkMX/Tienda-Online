import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Tag } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  isOnSale?: boolean;
  salePrice?: number;
  description?: string;
  category?: string;
  specs?: Record<string, string>;
}

interface ProductDetailProps {
  product?: Product;
  similarProducts?: Product[];
  open?: boolean;
  onClose?: () => void;
  onAddToCart?: () => void;
}

const ProductDetail = ({
  product = {
    id: "1",
    name: "Sample Product",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "A high-quality product with amazing features.",
    category: "Electronics",
    specs: {
      Brand: "Premium Brand",
      Model: "2024",
      Warranty: "1 Year",
      Color: "Black",
    },
  },
  similarProducts = [],
  open = false,
  onClose = () => {},
  onAddToCart = () => {},
}: ProductDetailProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 bg-white">
        <ScrollArea className="h-full">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
                {product.isOnSale && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span>
                      Save $
                      {(
                        product.price - (product.salePrice || product.price)
                      ).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {product.isOnSale ? (
                      <>
                        <span className="text-2xl font-bold text-red-600">
                          ${product.salePrice?.toFixed(2)}
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <Button
                  size="lg"
                  className="w-full md:w-auto"
                  onClick={onAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>

                <Separator />

                {/* Specifications */}
                <div>
                  <h3 className="font-semibold mb-3">Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.specs || {}).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <p className="text-sm text-gray-500">{key}</p>
                        <p className="font-medium">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {similarProducts.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-4">Similar Products</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {similarProducts.map((item) => (
                          <div key={item.id} className="space-y-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full aspect-square object-cover rounded-md"
                            />
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;
