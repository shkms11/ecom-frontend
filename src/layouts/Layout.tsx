import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/shared/components";
import { Footer } from "@/shared/components";
import { CartDrawer } from "@/features/cart";
const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 ">
        <Outlet />
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Layout;
