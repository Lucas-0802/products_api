import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { Toaster } from "./components/ui/sonner";

export const App = () => {
  return (
    <BrowserRouter>
      <Router />
      <Toaster richColors />
    </BrowserRouter>
  );
};
