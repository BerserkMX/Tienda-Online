import React from "react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-600">
              Your trusted online store for quality products.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Contact Us</li>
              <li>Shipping Policy</li>
              <li>Returns & Exchanges</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>New Arrivals</li>
              <li>Best Sellers</li>
              <li>Sale</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>Pinterest</li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Your Store Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
