import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart, Tag } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  isOnSale?: boolean;
  salePrice?: number;
  onQuickView?: () => void;
  onAddToCart?: () => void;
}

const ProductCard = ({
  id = "1",
  name = "Sample Product",
  price = 99.99,
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  isOnSale = false,
  salePrice,
  onQuickView = () => {},
  onAddToCart = () => {},
}: ProductCardProps) => {
  return (
    <Card className="w-[280px] h-[400px] group relative bg-white">
      <CardContent className="p-0">
        <div className="relative h-[280px] overflow-hidden">
          {isOnSale && (
            <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded-md flex items-center gap-1">
              <Tag className="h-4 w-4" />
              <span className="text-sm font-medium">
                Save ${(price - (salePrice || price)).toFixed(2)}
              </span>
            </div>
          )}
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Hover overlay with quick view and add to cart buttons */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={onQuickView}
                    className="rounded-full"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Quick View</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={onAddToCart}
                    className="rounded-full"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to Cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <h3 className="font-medium text-lg mb-2">{name}</h3>
        <div className="flex items-center gap-2">
          {isOnSale ? (
            <>
              <span className="text-gray-600 line-through">
                ${price.toFixed(2)}
              </span>
              <span className="text-red-600 font-medium">
                ${salePrice?.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-gray-600">${price.toFixed(2)}</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
