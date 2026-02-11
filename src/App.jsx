// src/App.jsx
import React, { useEffect } from "react";
import Routing from "./pages/Routing/Routing";
import { Toaster } from "sonner";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <ThemeProvider>
      <Routing />
      <Toaster position="top-center" richColors closeButton />
    </ThemeProvider>
  );
};

export default App;
