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
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import QuantityButton from "../Buttons/QuantityButton";
import BuyNowButton from "../Buttons/BuyNowButton";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import styled from "@emotion/styled";
import { formatCurrency } from "@/app/utils/formatCurrency";
import Swal from "sweetalert2";
import salerAgents from "@/app/utils/salersAgents";

const RotatingImage = styled("img")(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: 0,
  width: "40px",
  marginRight: "-15px",
  marginTop: "-5px",
  transformOrigin: "30px 0px",
  animation: "shake 10s cubic-bezier(0.73, 0, 0.21, 0.97) infinite",
  zIndex: 10,
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

function generateWhatsAppMessage({
  cart,
  personalInformation,
  totalAmount,
  payMethod,
  sendMethod,
  saler,
}) {
  // Formato de fecha y hora
  const currentDate = new Date();
  const dateStr = `${currentDate.getDate().toString().padStart(2, "0")}/${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${currentDate.getFullYear()} - ${currentDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${currentDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}hs`;

  // Generar lista de productos
  const productList = cart
    .map((item) => `• ${item.amount}x ${item.title}`)
    .join("\n");

  let salerName = "";
  if (saler) {
    salerName = salerAgents[saler].name;
  }

  // Calcular subtotal y total
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );
  const discountAmount = totalAmount.totalDiscount;
  const total = totalAmount.total;

  // Elegir etiqueta de método de pago
  const sendMethodLabel =
    sendMethod === "retiro"
      ? "Rerito por punto de Entrega"
      : "Envio a coordinar";
  const paymentLabel = payMethod === "transfer" ? "Transferencia" : "Crédito";

  // Mensaje de WhatsApp
  const message = `✨ _¡Hola! Te paso el resumen de mi pedido_ ✨\n\n📅 *Fecha:* ${dateStr}\n👤 *Nombre:* ${
    personalInformation.name
  }\n📞 *Teléfono:* ${personalInformation.phone}${
    salerName ? `\n*Vendedor*: ${salerName}` : ""
  }\n\n💳 *Forma de pago:* ${paymentLabel}\n💰 *Total:* ${formatCurrency(
    total
  )}\n\n🚚 *Método de Envío:* ${sendMethodLabel}\n\n📦 *_Mi pedido es_*\n\n*PRODUCTOS*\n${productList}\n\n📜 *Resumen de Costos:*\n- Subtotal: $${subtotal}\n- Descuento del ${
    totalAmount.discount
  }%: $${discountAmount}\n- Costo de envío: A Coordinar\n- *TOTAL:* *$${total}*\n\n✨ _Espero tu respuesta para confirmar mi pedido_ ✨`;

  const encodedMessage = encodeURIComponent(message);

  // Número de teléfono
  const phoneNumber = "5493516368347";

  // Enlace de WhatsApp
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  console.log("Message->", message);

  return { message, whatsappLink };
}

export default function CartDrawer({
  handleClose,
  handleOpen,
  isOpen,
  reloadCart,
  handleDelete,
  handleAdd,
  handleRemove,
  saler
}) {
  const [personalInformation, setPersonalInformation] = useState({
    name: "",
    phone: "",
  });
  const [cart, setCart] = useState([]);
  const [sendMethod, setSendMethos] = useState("retiro");
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

  const handleBuy = () => {
    if (!personalInformation.name || !personalInformation.phone) {
      return Swal.fire({
        icon: "warning",
        title: "Por favor, completa tus datos personales.",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    const { whatsappLink } = generateWhatsAppMessage({
      cart,
      personalInformation,
      totalAmount,
      payMethod,
      sendMethod,
      saler
    });
    Swal.fire({
      title: "¡Ya casi estamos!✨",
      text: "Para terminar y brindarte una mejor atención, te redirigiremos a WhatsApp con los detalles de tu pedido.",
      timer: 3300,
      icon: "info",
      showConfirmButton: false,
    });
    setTimeout(() => window.open(whatsappLink), 3302);
  };

  const handleChange = (e) =>
    setPersonalInformation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

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
      <Box
        sx={{
          width: 400,
          padding: 4,
          maxHeight: "80vh",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Carrito de Compras</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />
        <List sx={{ marginBottom: "40px" }}>
          {Boolean(cart?.length > 0) ? (
            cart.map((item) => (
              <ListItem
                sx={{ p: 0, marginBottom: "10px", position: "relative" }}
              >
                <DeleteOutlineIcon
                  onClick={() => handleDelete(item)}
                  sx={{
                    position: "absolute",
                    top: "3px",
                    right: 0,
                    fontSize: "20px",
                  }}
                />
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
          <RadioGroup
            sx={{ alignItems: "center", width: "100%" }}
            value={sendMethod}
            onChange={(e) => setSendMethos(e.target.value)}
          >
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
                    <Typography>
                      Envío
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 200, p: 0, marginTop: "-5px" }}
                      >
                        Domicilio / Sucursal
                      </Typography>
                    </Typography>
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
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" marginRight={2} marginBottom={1}>
            DATOS PERSONALES
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Nombre"
              variant="outlined"
              type="text"
              name="name"
              value={personalInformation.name}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              label="Número de Teléfono"
              variant="outlined"
              type="tel"
              name="phone"
              value={personalInformation.phone}
              fullWidth
              onChange={handleChange}
            />
          </Box>
        </List>
      </Box>

      <Box
        sx={{
          width: "100%",
          position: "absolute",
          paddingLeft: 4,
          paddingRight: 4,
          paddingBottom: 2,
          bottom: 0,
          textAlign: "center",
          backgroundColor: "#fff",
          zIndex: 20,
          boxShadow: "0px -4px 6px rgba(0, 0, 0, 0.1)",
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
            <span style={{ fontWeight: 600 }}>-</span>{" "}
            {formatCurrency(totalAmount.totalDiscount)}
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
        <BuyNowButton
          text={"CONTINUAR CON LA COMPRA"}
          handleBuyNow={handleBuy}
        />
      </Box>
    </SwipeableDrawer>
  );
}
