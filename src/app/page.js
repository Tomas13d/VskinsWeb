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
import Footer from "./Components/Footer";
import Swal from "sweetalert2";

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
const Icons = {
  BenefitsIcon: InfoIcon,
  UsageIcon: TimerIcon,
  IngredientsIcon: ListIcon,
  ShoppingIcon: ShoppingCartIcon,
};

export default function Home() {
  const [reloadCart, setReloadCart] = useState(true);
  const [openCart, setOpenCart] = useState(false);

  const handleAdd = (item) => {
    let product = { ...item, amount: 1 };
    const storageCart = window.localStorage.getItem("Cart");
    let parsedCart = storageCart ? JSON.parse(storageCart) : [];

    const existingProductIndex = parsedCart.findIndex(
      (storageItem) => storageItem.cod_subrubro === item.cod_subrubro
    );

    if (existingProductIndex !== -1) {
      parsedCart = parsedCart.map((storageItem, index) =>
        index === existingProductIndex
          ? { ...storageItem, amount: storageItem.amount + 1 }
          : storageItem
      );
    } else {
      parsedCart.push(product);
    }

    window.localStorage.setItem("Cart", JSON.stringify(parsedCart));
    setReloadCart((p) => !p);

    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleDelete = (item) => {
    const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
    if (!storageCart) return;

    const updatedCart = storageCart.filter(
      (cartItem) => cartItem.id !== item.id
    );

    window.localStorage.setItem("Cart", JSON.stringify(updatedCart));
    setReloadCart((p) => !p);
    Swal.fire({
      icon: "success",
      title: "Producto eliminado",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleRemove = (item) => {
    const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
    if (!storageCart) return;

    const updatedCart = storageCart.reduce((acc, cartItem) => {
      if (cartItem.id === item.id) {
        if (cartItem.amount > 1) {
          acc.push({ ...cartItem, amount: cartItem.amount - 1 });
        }
      } else {
        acc.push(cartItem);
      }
      return acc;
    }, []);

    window.localStorage.setItem("Cart", JSON.stringify(updatedCart));
    setReloadCart((p) => !p);
    Swal.fire({
      icon: "success",
      title: "Producto eliminado",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <PrimarySearchAppBar
          setOpenCart={setOpenCart}
          setReloadCart={setReloadCart}
        />
        <CartDrawer
          isOpen={openCart}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleRemove={handleRemove}
          handleClose={() => setOpenCart(false)}
          handleOpen={() => {
            setOpenCart(true);
            setReloadCart((p) => !p);
          }}
          reloadCart={reloadCart}
        />
        <Carousel images={ProductImages} showThumbs={false} />
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
              </Typography>
            </>
          }
          title="NIGHT POWER SERUM"
          price="23.500"
          discountPrice="28.000"
        />
        <Box sx={{ width: "90%", margin: "20px auto" }}>
          <QuantityButton haveTitle={true} />
          <AddToCartButton
            text={"AGREGAR AL CARRITO"}
            handleAdd={() =>
              handleAdd({
                id: "VS_SERUM_001",
                title: "NIGHT POWER SERUM",
                price: "$28.000",
                discountPrice: "$23.500",
              })
            }
          />
          <BuyNowButton
            text={"COMPRAR AHORA"}
            handleBuyNow={() => {
              handleAdd(product);
              setOpenCart(true);
            }}
          />
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
            sx={{ marginBottom: "15px", marginTop: "25px", fontWeight: 400 }}
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
        <Box sx={{ padding: "20px", marginBottom: "40px" }}>
          {productDetailsSerum.map((item) => (
            <AccordionUsage
              title={item.title}
              information={item.information}
              Icon={Icons[item.icon]}
            />
          ))}
        </Box>
        <Footer />
      </ThemeProvider>
    </>
  );
}
