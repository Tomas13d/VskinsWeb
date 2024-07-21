import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

const QuantityButtonCustom = styled(Button)(({ theme }) => ({
  minWidth: "40px",
  padding: "0",
  fontSize: "1.5rem",
  color: "#000",
  borderRadius: "0",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
}));

const QuantityButton = ({
  haveTitle,
  amount,
  handleAdd,
  handleRemove,
  item,
}) => {
  const [quantity, setQuantity] = useState(amount);

  useEffect(() => setQuantity(amount), [amount]);

  return (
    <Box sx={{ marginBottom: "10px" }}>
      {haveTitle && (
        <Typography variant="subtitle1" marginRight={2}>
          CANTIDAD
        </Typography>
      )}
      <Box
        display="flex"
        alignItems="center"
        border="1px solid #ccc"
        borderRadius="4px"
        maxWidth={"170px"}
        height={"45px"}
      >
        <QuantityButtonCustom onClick={() => handleRemove(item)}>
          -
        </QuantityButtonCustom>
        <Typography
          variant="h6"
          paddingX={2}
          width={"100%"}
          textAlign={"center"}
        >
          {quantity}
        </Typography>
        <QuantityButtonCustom onClick={() => handleAdd(item)}>
          +
        </QuantityButtonCustom>
      </Box>
    </Box>
  );
};

export default QuantityButton;
