import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/contexts/AppContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Orders from "@/pages/Orders";
import Saved from "@/pages/Saved";
import Profile from "@/pages/Profile";
import Cart from "@/pages/Cart";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/orders" component={Orders} />
      <Route path="/saved" component={Saved} />
      <Route path="/profile" component={Profile} />
      <Route path="/cart" component={Cart} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Layout>
            <Router />
          </Layout>
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
