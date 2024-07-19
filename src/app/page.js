"use client";
import PrimarySearchAppBar from "./Components/Navbar";
import CartDrawer from "./Components/CartDrawer";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import Carousel from "./Components/Carrousel";
import InformationSection from "./Components/InformationSection";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#4787D3", // Personaliza tu color primario
    },
    secondary: {
      main: "#DBEBF4", // Personaliza tu color secundario
    },
  },
});

export default function Home() {
  const [openCart, setOpenCart] = useState(false);
  return (
    <>
      <ThemeProvider theme={theme}>
        <PrimarySearchAppBar setOpenCart={setOpenCart} />
        <CartDrawer
          isOpen={openCart}
          handleClose={() => setOpenCart(false)}
          handleOpen={() => setOpenCart(true)}
        />
        <Carousel />
        <InformationSection
          haveRanking={true}
          description="Esta poderosa combinación revitaliza y transforma tu piel mientras dormís. La niacinamida al 20% minimiza los poros, equilibra la producción de sebo y mejora la textura de la piel, mientras que el ácido hialurónico al 2.5% mantiene la piel hidratada toda la noche. Notarás cómo los poros se minimizan visiblemente y la piel adquiere un brillo natural y saludable. Despierta con una piel increíblemente hidratada y suave. La niacinamida trabaja activamente para suavizar la textura de la piel, dejándola más uniforme y libre de imperfecciones. Con su capacidad para fortalecer la barrera cutánea, este sérum protege tu piel de agresores externos mientras repara los daños existentes.
¡Descubrí la magia de este sérum nocturno y despertá con una piel más joven, fresca y radiante! Ideal para mujeres que buscan lo mejor en cuidado de la piel, con la confianza de usar un producto argentino de alta calidad.
"
          title="NIGHT POWER SERUM"
          price="23.500"
          discountPrice="28.000"
        />
      </ThemeProvider>
    </>
  );
}
