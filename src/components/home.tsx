import React, { useState, useEffect } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ProductGrid from "./products/ProductGrid";
import CartSidebar from "./cart/CartSidebar";
import AuthModal from "./auth/AuthModal";
import ProductDetail from "./products/ProductDetail";
import CheckoutModal from "./checkout/CheckoutModal";
import OrderStatus from "./orders/OrderStatus";
import OrderList from "./orders/OrderList";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  isOnSale?: boolean;
  salePrice?: number;
  description?: string;
  category?: string;
  quantity?: number;
}

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation.",
    isOnSale: true,
    salePrice: 149.99,
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Electronics",
    description: "Feature-rich smartwatch with health tracking.",
  },
  {
    id: "3",
    name: "Premium Speaker",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d",
    category: "Electronics",
    description: "Premium wireless speaker with crystal clear sound.",
    isOnSale: true,
    salePrice: 299.99,
  },
  {
    id: "4",
    name: "Laptop Stand",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
    category: "Accessories",
    description: "Ergonomic laptop stand for better posture.",
  },
  {
    id: "5",
    name: "Wireless Mouse",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
    category: "Accessories",
    description: "Precision wireless mouse for professionals.",
  },
  {
    id: "6",
    name: "Mechanical Keyboard",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
    category: "Accessories",
    description: "Premium mechanical keyboard with RGB lighting.",
    isOnSale: true,
    salePrice: 129.99,
  },
];

const Home = () => {
  const { toast } = useToast();
  const store = useStore();

  // Local state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderListOpen, setIsOrderListOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products] = useState(defaultProducts);
  const [showOnSale, setShowOnSale] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Product handlers
  const handleQuickView = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const handleAddToCart = (productId: string) => {
    const productToAdd = products.find((p) => p.id === productId);
    if (!productToAdd) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      }
      return [...prevItems, { ...productToAdd, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Cart handlers
  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem && (existingItem.quantity || 0) > 1) {
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: (item.quantity || 0) - 1 }
            : item,
        );
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const handleDeleteFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  };

  const handleIncreaseQuantity = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item,
      ),
    );
  };

  // Checkout handlers
  const handleCheckout = () => {
    if (!store.isLoggedIn) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsCheckoutModalOpen(true);
  };

  const handleCompleteCheckout = (shippingDetails: any) => {
    store.addOrder({
      items: cartItems,
      total: cartItems.reduce(
        (sum, item) =>
          sum +
          (item.isOnSale ? item.salePrice || item.price : item.price) *
            (item.quantity || 1),
        0,
      ),
      shippingDetails,
    });
    setCartItems([]);
    setIsCheckoutModalOpen(false);
    toast({
      title: "Order placed successfully!",
      description: "You can track your order in the My Orders section.",
    });
  };

  // Auth handlers
  const handleLogin = async (email: string, password: string) => {
    await store.login(email, password);
    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });
  };

  const handleSignup = async (email: string, password: string) => {
    await store.signup(email, password);
    toast({
      title: "Welcome!",
      description: "Your account has been created successfully.",
    });
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    if (showOnSale) {
      return matchesSearch && matchesCategory && product.isOnSale;
    }
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean)),
  );

  // Get similar products
  const getSimilarProducts = (product: Product) => {
    return products
      .filter(
        (p) =>
          p.category === product.category &&
          p.id !== product.id &&
          p.category !== undefined,
      )
      .slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        cartItemCount={cartItems.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0,
        )}
        isLoggedIn={store.isLoggedIn}
        userName={store.user?.name}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onSignupClick={() => setIsAuthModalOpen(true)}
        onSearchChange={setSearchTerm}
        onToggleSale={() => setShowOnSale(!showOnSale)}
        showOnSale={showOnSale}
        categories={categories as string[]}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onLogout={store.logout}
        onViewOrders={() => setIsOrderListOpen(true)}
        theme={store.theme}
        onThemeChange={store.setTheme}
        color={store.color}
        onColorChange={store.setColor}
      />

      <main className="flex-1">
        <div className="container mx-auto py-8 px-4">
          <ProductGrid
            products={filteredProducts}
            onQuickView={handleQuickView}
            onAddToCart={handleAddToCart}
          />
        </div>
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onCheckout={handleCheckout}
        onRemoveItem={handleRemoveFromCart}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDeleteItem={handleDeleteFromCart}
      />

      <AuthModal
        open={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
        onSocialLogin={(provider) => {
          console.log("Social login:", provider);
          // Implement social login here
        }}
      />

      <CheckoutModal
        open={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        items={cartItems}
        onCompleteCheckout={handleCompleteCheckout}
        isLoggedIn={store.isLoggedIn}
        onLoginRequired={() => {
          setIsCheckoutModalOpen(false);
          setIsAuthModalOpen(true);
        }}
      />

      <OrderList
        open={isOrderListOpen}
        onClose={() => setIsOrderListOpen(false)}
        orders={store.orders}
        onViewOrder={(orderId) => setSelectedOrderId(orderId)}
      />

      {selectedOrderId && (
        <OrderStatus
          open={!!selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
          order={store.orders.find((o) => o.id === selectedOrderId)}
          onContactSupport={() => {
            toast({
              title: "Support",
              description: "Our team will contact you shortly.",
            });
          }}
        />
      )}

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          similarProducts={getSimilarProducts(selectedProduct)}
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => {
            handleAddToCart(selectedProduct.id);
            setSelectedProduct(null);
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default Home;
