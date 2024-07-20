import { Button } from "@mui/material";

const AddToCartButton = ({ text, type = "black", handleAdd }) => {
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
      onClick={handleAdd}
      variant="contained"
      sx={{
        marginTop: "10px",
        marginBottom: "5px",
        width: "100%",
        height: "45px",
        ...types[type],
      }}
    >
      {text}
    </Button>
  );
};

export default AddToCartButton;
