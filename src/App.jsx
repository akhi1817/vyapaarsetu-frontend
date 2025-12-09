import React, { useEffect } from 'react'
import Routing from './pages/Routing/Routing'
import { Toaster } from 'sonner'
import AOS from "aos";
import "aos/dist/aos.css";
const App = () => {

  useEffect(() => {
  AOS.init({ duration: 800, once: true });
}, []);
  return (
    <>

    <Routing/>
          <Toaster position='top-center' richColors closeButton />

    
    </>
  )
}

export default App
