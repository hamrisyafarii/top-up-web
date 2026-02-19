import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";
import {ThemeProvider} from "./components/theme-provider";
import {Toaster} from "./components/ui/sonner";
import {AuthProvider} from "./context/AuthProvider";
import {TooltipProvider} from "./components/ui/tooltip";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster richColors position="bottom-center" />
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
