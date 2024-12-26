import React from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductGridProps {
  products?: Product[];
  onQuickView?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
}

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: "3",
    name: "Premium Speaker",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d",
  },
  {
    id: "4",
    name: "Laptop Stand",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
  },
  {
    id: "5",
    name: "Wireless Mouse",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
  },
  {
    id: "6",
    name: "Mechanical Keyboard",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
  },
];

const ProductGrid = ({
  products = defaultProducts,
  onQuickView = () => {},
  onAddToCart = () => {},
}: ProductGridProps) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            onQuickView={() => onQuickView(product.id)}
            onAddToCart={() => onAddToCart(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
