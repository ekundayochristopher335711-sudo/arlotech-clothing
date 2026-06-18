"use client";

import { Toaster } from "react-hot-toast";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import WhatsAppButton from "./WhatsAppButton";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#111",
            color: "#fff",
            fontSize: "13px",
            borderRadius: "2px",
            padding: "12px 18px",
            fontFamily: "inherit",
          },
        }}
      />
      <TopBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </>
  );
}
