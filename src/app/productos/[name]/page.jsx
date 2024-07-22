"use client";
import { useEffect, useState } from "react";
import Carousel from "../../Components/Carrousel";
import InformationSection from "../../Components/InformationSection";
import AddToCartButton from "../../Components/Buttons/AddToCartButton";
import BuyNowButton from "../../Components/Buttons/BuyNowButton";
import QuantityButton from "../../Components/Buttons/QuantityButton";
import LongProductCard from "../../Components/LongProductCard";
import PrimarySearchAppBar from "../../Components/Navbar";
import AccordionUsage from "../../Components/AccordionUsage";
import Footer from "../../Components/Footer";
import CartDrawer from "../../Components/CartDrawer";
import products from "../../utils/productDetails";
import Swal from "sweetalert2";
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import TimerIcon from "@mui/icons-material/Timer";
import ListIcon from "@mui/icons-material/List";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSearchParams } from "next/navigation";

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

export default function ProductPage({ params }) {
  const searchParams = useSearchParams();
  const saler = searchParams.get("saler");
  const [productAmount, setProductAmount] = useState();
  const [cartLength, setCartLength] = useState(0);
  const [reloadCart, setReloadCart] = useState(true);
  const [openCart, setOpenCart] = useState(false);
  const product = products[params.name];

  useEffect(() => {
    const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
    if (storageCart && storageCart.length > 0) {
      const productFinded = storageCart.find((item) => item.id === product.id);
      const totalAmount = storageCart.reduce(
        (acc, item) => acc + item.amount,
        0
      );
      setCartLength(totalAmount);
      if (productFinded) {
        setProductAmount(productFinded.amount);
      } else {
        setProductAmount(1);
      }
    } else {
      setProductAmount(1);
    }
  }, [reloadCart]);

  const handleAdd = (item) => {
    let product = { ...item, amount: 1 };
    const storageCart = window.localStorage.getItem("Cart");
    let parsedCart = storageCart ? JSON.parse(storageCart) : [];

    const existingProductIndex = parsedCart.findIndex(
      (storageItem) => storageItem.id === item.id
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

  const productItem = {
    id: product.id,
    title: product.title,
    price: product.price,
    transferPrice: product.transferPrice,
    creditPrice: product.creditPrice,
    img: product.images[0],
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <PrimarySearchAppBar
          setOpenCart={setOpenCart}
          setReloadCart={setReloadCart}
          cartLength={cartLength}
        />
        <CartDrawer
          saler={saler}
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
        <Carousel images={product.images} showThumbs={false} />
        <InformationSection
          haveRanking={true}
          description={
            <>
              <Typography style={{ fontWeight: 600 }}>
                {product.descriptionTitle}
              </Typography>
              <Typography sx={{ fontWeight: 200 }}>
                {product.description}
              </Typography>
            </>
          }
          title={product.title}
          price={product.price}
          transferPrice={product.transferPrice}
          creditPrice={product.creditPrice}
        />
        <Box sx={{ width: "90%", margin: "20px auto" }}>
          <QuantityButton
            haveTitle={true}
            amount={productAmount || 1}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            item={productItem}
          />
          <AddToCartButton
            text={"AGREGAR AL CARRITO"}
            handleAdd={() => handleAdd(productItem)}
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
          {product.haveTestimonies && (
            <>
              <Typography
                variant="h5"
                sx={{
                  marginBottom: "15px",
                  marginTop: "25px",
                  fontWeight: 400,
                }}
              >
                Nuestras clientas
              </Typography>
              <Carousel
                images={product.testimoniesImages}
                showThumbs={false}
                showArrows={false}
                arrowColors={{ color: "#fff", backgroundColor: "#691A52" }}
              />
            </>
          )}

          <Typography
            variant="h5"
            sx={{ marginBottom: "15px", marginTop: "40px", fontWeight: 400 }}
          >
            Nuestras clientas también llevan
          </Typography>
          {Boolean(product?.referedProduct?.length > 0) &&
            product.referedProduct.map((item) => (
              <LongProductCard
                title={item.title}
                image={item.img}
                description={item.description}
                item={item}
                handleAdd={handleAdd}
                link={item.link}
                saler={saler}
              />
            ))}
        </Box>
        <Box sx={{ padding: "20px", marginBottom: "40px" }}>
          {product.productDetails.map((item) => (
            <AccordionUsage
              title={item.title}
              information={item.information}
              Icon={Icons[item.icon]}
            />
          ))}
        </Box>
        <Footer saler={saler}/>
      </ThemeProvider>
    </>
  );
}
