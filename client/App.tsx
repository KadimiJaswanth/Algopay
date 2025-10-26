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
import PaymentsDemo from "./pages/PaymentsDemo";
import PaymentsList from "./pages/PaymentsList";
import { NavBar } from "@/components/NavBar";
import Layout from "@/components/Layout";
import { UIProvider } from "@/context/UIContext";
import { WalletProvider } from "@/context/WalletContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <WalletProvider>
          <UIProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Index />} />
              {/* Routes that use the app shell with sidebar */}
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
              <Route path="/send" element={<Layout><Send /></Layout>} />
              <Route path="/receive" element={<Layout><Receive /></Layout>} />
              <Route path="/transactions" element={<Layout><Transactions /></Layout>} />
              <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
              <Route path="/settings" element={<Layout><Settings /></Layout>} />
              {/* Demo page for payments components */}
              <Route path="/payments-demo" element={<Layout><PaymentsDemo /></Layout>} />
                <Route path="/payments" element={<Layout><PaymentsList /></Layout>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          </UIProvider>
        </WalletProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
