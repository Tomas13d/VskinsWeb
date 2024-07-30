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
      backgroundColor: "#BAC61B",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#BAC61B",
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
