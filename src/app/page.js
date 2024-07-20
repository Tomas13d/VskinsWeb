"use client";
import PrimarySearchAppBar from "./Components/Navbar";
import CartDrawer from "./Components/CartDrawer";
import { useState } from "react";
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import Carousel from "./Components/Carrousel";
import InformationSection from "./Components/InformationSection";
import AddToCartButton from "./Components/Buttons/AddToCartButton";
import BuyNowButton from "./Components/Buttons/BuyNowButton";
import QuantityButton from "./Components/Buttons/QuantityButton";
import LongProductCard from "./Components/LongProductCard";
import InfoIcon from "@mui/icons-material/Info";
import TimerIcon from "@mui/icons-material/Timer";
import ListIcon from "@mui/icons-material/List";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { productDetailsSerum } from "./utils/productDetails";
import AccordionUsage from "./Components/AccordionUsage";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 800,
    fontWeightBold: 900,
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
const ProductImages = ["/Serum.jpeg", "/Serum.jpeg", "/Serum.jpeg"];
const TestimoniesImages = [
  "Testimonio1.png",
  "Testimonio2.png",
  "Testimonio3.png",
  "Testimonio4.png",
];
const Icons = {
  BenefitsIcon: InfoIcon,
  UsageIcon: TimerIcon,
  IngredientsIcon: ListIcon,
  ShoppingIcon: ShoppingCartIcon,
};
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
        <Carousel images={ProductImages} />
        <InformationSection
          haveRanking={true}
          description={
            <>
              <Typography style={{ fontWeight: 600 }}>
                NIGHT POWER SERUM CON 20% DE NIACINAMIDA, 2,5% DE ÁCIDO
                HIALURÓNICO.
              </Typography>
              <Typography sx={{ fontWeight: 200 }}>
                Esta poderosa combinación revitaliza tu piel mientras dormís. La
                niacinamida al 20% minimiza los poros, equilibra la producción
                de sebo y mejora la textura de la piel. El ácido hialurónico al
                2.5% mantiene la piel hidratada toda la noche. Despierta con una
                piel increíblemente hidratada y suave, con poros minimizados y
                un brillo natural. Este sérum fortalece la barrera cutánea y
                repara los daños existentes. ¡Descubrí la magia de este sérum
                nocturno y despertá con una piel más joven, fresca y radiante!
                Ideal para mujeres que buscan lo mejor en cuidado de la piel,
                con la confianza de usar un producto argentino de alta calidad.
              </Typography>
            </>
          }
          title="NIGHT POWER SERUM"
          price="23.500"
          discountPrice="28.000"
        />
        <Box sx={{ width: "90%", margin: "20px auto" }}>
          <QuantityButton />
          <AddToCartButton text={"AGREGAR AL CARRITO"} handleAdd={() => {}} />
          <BuyNowButton text={"COMPRAR AHORA"} handleBuyNow={() => {}} />
        </Box>
        <Box
          sx={{
            backgroundColor: "#F5F5F5",
            padding: "20px",
            marginBottom: "10px",
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginBottom: "15px", marginTop: "50px", fontWeight: 400 }}
          >
            Nuestras clientas
          </Typography>
          <Carousel
            images={TestimoniesImages}
            showThumbs={false}
            showArrows={false}
            arrowColors={{ color: "#fff", backgroundColor: "#691A52" }}
          />
          <Typography
            variant="h5"
            sx={{ marginBottom: "15px", marginTop: "40px", fontWeight: 400 }}
          >
            Nuestras clientas también llevan
          </Typography>
          <LongProductCard
            title={"POWER CREAM"}
            image="/PowerCream.jpg"
            description={
              "Crema facial con 20% de niacinamida, ácido salicílico 2% y vitamina C"
            }
          />
        </Box>
        <Box sx={{padding: "20px", marginBottom: "440px"}}>
        {productDetailsSerum.map((item) => (
          <AccordionUsage
            title={item.title}
            information={item.information}
            Icon={Icons[item.icon]}
          />
        ))}
        </Box>
    
      </ThemeProvider>
    </>
  );
}
