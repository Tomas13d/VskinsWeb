import { Button } from "@mui/material";

const BuyNowButton = ({ text, type = "colored", handleBuyNow }) => {
  const types = {
    black: {
      backgroundColor: "#000",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#333",
      },
    },
    colored: {
      backgroundColor: "#691A52",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#8A2C70",
      },
    },
  };

  return (
    <Button
      id="reseñas"
      onClick={handleBuyNow}
      variant="contained"
      sx={{
        marginTop: "10px",
        marginTop: "10px",
        width: "100%",
        height: "45px",
        ...types[type],
      }}
    >
      {text}
    </Button>
  );
};

export default BuyNowButton;
