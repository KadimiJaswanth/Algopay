import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Send from "./pages/Send";
import Receive from "./pages/Receive";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import { NavBar } from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { WalletProvider } from "@/context/WalletContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <WalletProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Index />} />
              {/* Routes that use the app shell with sidebar */}
              <Route
                path="/dashboard"
                element={
                  <div className="md:flex">
                    <div className="md:w-60 hidden md:block">
                      <Sidebar />
                    </div>
                    <div className="flex-1">
                      <Dashboard />
                    </div>
                  </div>
                }
              />
              <Route
                path="/send"
                element={
                  <div className="md:flex">
                    <div className="md:w-60 hidden md:block" />
                    <div className="flex-1">
                      <Send />
                    </div>
                  </div>
                }
              />
              <Route
                path="/receive"
                element={
                  <div className="md:flex">
                    <div className="md:w-60 hidden md:block" />
                    <div className="flex-1">
                      <Receive />
                    </div>
                  </div>
                }
              />
              <Route
                path="/transactions"
                element={
                  <div className="md:flex">
                    <div className="md:w-60 hidden md:block" />
                    <div className="flex-1">
                      <Transactions />
                    </div>
                  </div>
                }
              />
              <Route
                path="/analytics"
                element={
                  <div className="md:flex">
                    <div className="md:w-60 hidden md:block" />
                    <div className="flex-1">
                      <Analytics />
                    </div>
                  </div>
                }
              />
              <Route
                path="/settings"
                element={
                  <div className="md:flex">
                    <div className="md:w-60 hidden md:block" />
                    <div className="flex-1">
                      <Settings />
                    </div>
                  </div>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </WalletProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
