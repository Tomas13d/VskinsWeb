import React from "react";
import { Box, Typography, Grid, Icon, Divider } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import styled from "@emotion/styled";
import { formatCurrency } from "@/app/utils/formatCurrency";

const DiscountText = styled(Typography)`
  display: inline-block;
  margin-right: 8px;
`;

export default function InformationSection({
  haveRanking,
  description,
  title,
  price,
  transferPrice,
  creditPrice,
  payMethods,
}) {
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
      subdescription: "",
    },
  ];

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#fff", marginTop: "20px" }}>
      <Typography
        variant="h4"
        style={{
          fontWeight: 100,
          fontSize: "30px",
        }}
      >
        {title}
      </Typography>
      {haveRanking && (
        <Box display="flex" alignItems="center" my={1}>
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} sx={{ color: "#691A52" }} />
          ))}
          <Typography variant="body1" ml={1}>
            4.9
          </Typography>
          <Typography
            variant="body2"
            component="a"
            href="#reseñas"
            ml={1}
            sx={{ textDecoration: "underline", color: "#691A52" }}
          >
            Ver reseñas
          </Typography>
        </Box>
      )}
      <Box
        display="flex"
        alignItems="center"
        sx={{ marginBottom: "30px", marginTop: "15px" }}
      >
        <Typography variant="h5" sx={{ fontWeight: 400, marginRight: "10px" }}>
          <span
            style={{ fontSize: "12px", display: "block", color: "#9E9E9E" }}
          >
            Abonando con transferencia
          </span>
          {formatCurrency(transferPrice)}
          <Typography
            variant="body1"
            component="span"
            sx={{
              textDecoration: "line-through",
              color: "#9E9E9E",
              paddingBottom: "10px",
              marginLeft: "10px",
            }}
          >
            {formatCurrency(price)}
          </Typography>
        </Typography>
      </Box>
      {examplePayMethods.map((method, index) => (
        <Box
          display="flex"
          alignItems="flex-start"
          my={1}
          key={index}
          sx={{ marginBottom: "15px" }}
        >
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
          <Typography variant="body1" ml={1}>
            <DiscountText
              variant="body1"
              component="span"
              sx={{ fontWeight: "bold" }}
            >
              {method.discount}% de descuento
            </DiscountText>
            <span style={{ fontWeight: 400, marginLeft: "-5px" }}>
              {" "}
              {method.description}{" "}
            </span>
            <br />
            <span
              style={{ fontSize: "14px", marginTop: "-15px", fontWeight: 400 }}
            >
              {method?.subdescription || ""}
            </span>
          </Typography>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      {description}
    </Box>
  );
}
