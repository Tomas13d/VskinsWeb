import {
  Box,
  Button,
  Divider,
  FormControlLabel,
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
import { useEffect, useState } from "react";

export default function CartDrawer({
  handleClose,
  handleOpen,
  isOpen,
  reloadCart,
  handleDelete,
  handleAdd,
  handleRemove
}) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
    if (storageCart && storageCart.length > 0) {
      setCart(storageCart);
    }
  }, [reloadCart]);

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
                        sx={{ fontWeight: "bold", marginBottom: "5px" }}
                      >
                        {item.price}
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
          {/*   <ShippingCalculator /> */}
          <RadioGroup sx={{ alignItems: "center", width: "100%" }}>
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "5px",
          }}
        >
          <Typography>Subtotal:</Typography>
          <Typography>$43.500</Typography>
        </Box>
        <BuyNowButton text={"CONTINUAR CON LA COMPRA"} />
      </Box>
    </SwipeableDrawer>
  );
}
