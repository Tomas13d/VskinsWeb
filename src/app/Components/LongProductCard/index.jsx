import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  padding: "5px 10px",
  margin: "16px auto",
});

const LongProductCard = ({ image, title, description, item, handleAdd }) => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        sx={{ width: 80, height: 80, borderRadius: "8px" }}
        image={image}
        alt={title}
      />
      <CardContent sx={{ flex: "1 0 auto", paddingLeft: "16px" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", fontSize: "14px" }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "10px", maxWidth: "152px" }}
        >
          {description}
        </Typography>
      </CardContent>
      <Button
        onClick={() => handleAdd(item)}
        disableElevation
        variant="contained"
        sx={{
          backgroundColor: "#691A52",
          color: "#fff",
          fontSize: "10px",
          "&:hover": {
            backgroundColor: "#8A2C70",
          },
        }}
      >
        AGREGAR
      </Button>
    </StyledCard>
  );
};

export default LongProductCard;
