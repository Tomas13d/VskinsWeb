import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import QuantityButton from "../Buttons/QuantityButton";
import BuyNowButton from "../Buttons/BuyNowButton";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { formatCurrency } from "@/app/utils/formatCurrency";

const RotatingImage = styled("img")(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: 0,
  width: "40px",
  marginRight: "-15px",
  marginTop: "-5px",
  transformOrigin: "30px 0px",
  animation: "shake 10s cubic-bezier(0.73, 0, 0.21, 0.97) infinite",
  zIndex: 1000,
  "@keyframes shake": {
    "0%, 100%": {
      transform: "translateX(0)",
    },
    "10%, 30%, 50%, 70%, 90%": {
      transform: "translateX(-3px)",
    },
    "20%, 40%, 60%, 80%": {
      transform: "translateX(3px)",
    },
  },
}));

export default function CartDrawer({
  handleClose,
  handleOpen,
  isOpen,
  reloadCart,
  handleDelete,
  handleAdd,
  handleRemove,
}) {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState({
    total: 0,
    discount: 0,
    totalDiscount: 0,
  });
  const [payMethod, setPayMethod] = useState("transfer");
  const DiscountText = styled(Typography)`
    display: inline-block;
    margin-right: 8px;
  `;

  useEffect(() => {
    const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
    if (storageCart && storageCart.length > 0) {
      setCart(storageCart);

      const total = storageCart.reduce(
        (sum, item) => sum + item.transferPrice * item.amount,
        0
      );
      setTotalAmount((prevTotal) => ({ ...prevTotal, total }));
    } else {
      setCart([]);
      setTotalAmount({ total: 0, discount: 0, totalDiscount: 0 });
    }
  }, [reloadCart]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const total = cart.reduce(
        (sum, item) => sum + item.price * item.amount,
        0
      );
      const totalDiscount = cart.reduce((sum, item) => {
        if (payMethod === "transfer")
          return sum + item.transferPrice * item.amount;
        if (payMethod === "credit") return sum + item.creditPrice * item.amount;
        return sum;
      }, 0);

      const discountRate = payMethod === "transfer" ? 15 : 10;
      const discountAmount = total - totalDiscount;

      setTotalAmount({
        total: totalDiscount,
        discount: discountRate,
        totalDiscount: discountAmount,
      });
    } else {
      setTotalAmount({ total: 0, discount: 0, totalDiscount: 0 });
    }
  }, [payMethod, cart]);

  const examplePayMethods = [
    {
      type: "transfer",
      discount: 15,
      description: "pagando con Transferencia",
    },
    {
      type: "credit",
      discount: 10,
      description: "en tarjetas de crédito.",
      subdescription: "2 cuotas de $12.600",
    },
  ];

  return (
    <SwipeableDrawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      sx={{ position: "relative" }}
    >
      <Box sx={{ width: 400, padding: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Carrito de Compras</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />
        <List>
          {Boolean(cart?.length > 0) ? (
            cart.map((item) => (
              <ListItem sx={{ p: 0 }}>
                <Image
                  src={item.img || "/Serum.jpeg"}
                  alt="Smart Serum"
                  width={100}
                  height={150}
                  style={{ marginRight: "16px", borderRadius: "4px" }}
                />
                <ListItemText
                  primary={item.title}
                  secondary={
                    <>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          marginBottom: "5px",
                          color: "#000",
                        }}
                      >
                        {formatCurrency(
                          payMethod === "transfer"
                            ? item.transferPrice * item.amount
                            : item.creditPrice * item.amount
                        )}{" "}
                        -
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "#9E9E9E",
                            paddingBottom: "10px",
                            marginLeft: "10px",
                          }}
                        >
                          {formatCurrency(item.price * item.amount)}
                        </span>
                      </Typography>
                      <QuantityButton
                        haveTile={false}
                        amount={item.amount}
                        item={item}
                        handleAdd={handleAdd}
                        handleRemove={handleRemove}
                      />
                    </>
                  }
                />
              </ListItem>
            ))
          ) : (
            <p>No hay productos aun en el carrito</p>
          )}

          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" marginRight={2} marginBottom={1}>
            MEDIOS DE ENVÍO
          </Typography>
          <RadioGroup sx={{ alignItems: "center", width: "100%" }}>
            <FormControlLabel
              sx={{
                border: "1px solid #ccc",
                margin: "0px auto 10px auto",
                width: "100%",
                alignItems: "flex-start",
                borderRadius: "4px",
              }}
              value="retiro"
              control={
                <Radio
                  sx={{
                    color: "#000",
                    "&.Mui-checked": {
                      color: "#000",
                    },
                  }}
                />
              }
              label={
                <Stack
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: "100%",
                    minWidth: "283px",
                  }}
                >
                  <Box>
                    <Typography>Punto de retiro</Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 200, p: 0, marginTop: "-5px" }}
                    >
                      Av. 24 de Septiembre 1529
                      <br />
                      Córdoba, Capital | General Paz
                    </Typography>
                  </Box>
                  <Typography sx={{ marginRight: "2px", marginLeft: "3px" }}>
                    Gratis
                  </Typography>
                </Stack>
              }
            />
            <FormControlLabel
              sx={{
                border: "1px solid #ccc",
                margin: "0px auto 10px auto",
                width: "100%",
                alignItems: "center",
                borderRadius: "4px",
              }}
              value="envio"
              control={
                <Radio
                  sx={{
                    color: "#000",
                    "&.Mui-checked": {
                      color: "#000",
                    },
                  }}
                />
              }
              label={
                <Stack
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: "100%",
                    minWidth: "283px",
                  }}
                >
                  <Box>
                    <Typography>Envío Andreani</Typography>
                  </Box>
                  <Typography sx={{ marginRight: "2px", marginLeft: "3px" }}>
                    A calcular
                  </Typography>
                </Stack>
              }
            />
          </RadioGroup>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" marginRight={2} marginBottom={1}>
            MÉTODOS DE PAGO
          </Typography>
          <RadioGroup
            sx={{ alignItems: "center", width: "100%" }}
            value={payMethod}
            onChange={(e) => setPayMethod(e.target.value)}
          >
            {examplePayMethods.map((method, index) => (
              <FormControlLabel
                sx={{
                  border: "1px solid #ccc",
                  margin: "0px auto 10px auto",
                  width: "100%",
                  alignItems: "flex-start",
                  borderRadius: "4px",
                }}
                value={method.type}
                control={
                  <Radio
                    sx={{
                      color: "#000",
                      "&.Mui-checked": {
                        color: "#000",
                      },
                    }}
                  />
                }
                label={
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    my={1}
                    key={index + Date.now()}
                    sx={{ marginBottom: "15px", position: "relative" }}
                  >
                    {method.type === "transfer" && (
                      <RotatingImage
                        src="/etiqueta-de-descuento.png"
                        alt="Etiqueta de descuento"
                      />
                    )}
                    <Icon>
                      {method.type === "transfer" ? (
                        <LocalOfferIcon
                          sx={{
                            color: "#212121",
                          }}
                        />
                      ) : (
                        <CreditCardIcon
                          sx={{
                            color: "#212121",
                          }}
                        />
                      )}
                    </Icon>
                    <Typography variant="body2" ml={1}>
                      <DiscountText
                        variant="body2"
                        component="span"
                        sx={{ fontWeight: "bold" }}
                      >
                        {method.discount}% de descuento
                      </DiscountText>
                      <span style={{ fontWeight: 400, marginLeft: "-5px" }}>
                        {" "}
                        {method.description}{" "}
                      </span>
                    </Typography>
                  </Box>
                }
              />
            ))}
          </RadioGroup>
        </List>
        <Divider sx={{ my: 2 }} />
      </Box>

      <Box
        sx={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#fff",
        }}
      >
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "5px",
          }}
        >
          <Typography
            sx={{ fontWeight: 300 }}
          >{`Descuento ${totalAmount.discount}%:`}</Typography>
          <Typography sx={{ fontWeight: 300 }}>
            - {formatCurrency(totalAmount.totalDiscount)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "5px",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Subtotal:</Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            {formatCurrency(totalAmount.total)}
          </Typography>
        </Box>
        <BuyNowButton text={"CONTINUAR CON LA COMPRA"} />
      </Box>
    </SwipeableDrawer>
  );
}
