import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";
import {ThemeProvider} from "./components/theme-provider";
import {Toaster} from "./components/ui/sonner";
import {AuthProvider} from "./context/AuthProvider";
import {TooltipProvider} from "./components/ui/tooltip";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster richColors position="bottom-center" />
            <RouterProvider router={router} />
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
