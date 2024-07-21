import React from "react";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";

const ShippingCalculator = () => {
  return (
    <Box sx={{ marginBottom: "30px" }}>
      <Typography variant="subtitle1" sx={{ marginBottom: "5px" }}>
        MEDIOS DE ENVÍO
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "5px",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Tu código postal"
          type="number"
          InputProps={{
            sx: {
              height: "2.2em",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
            },
          }}
        />
        <Divider />
        <Box
          sx={{
            backgroundColor: "#00000024",
            height: "2.2em",
            p: "5px",
            width: "40%",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#00000030",
            },
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              marginBottom: "10px",
              p: 0,
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            CALCULAR
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ShippingCalculator;
