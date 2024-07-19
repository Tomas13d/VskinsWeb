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
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

export default function CartDrawer({ handleClose, handleOpen, isOpen }) {
  return (
    <SwipeableDrawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      onOpen={handleOpen}
    >
      <Box sx={{ width: 400, padding: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Carrito de Compras</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />
        <List>
          <ListItem>
            <Image
              src="/Serum.jpeg"
              alt="Smart Serum"
              width={100}
              height={150}
              style={{ marginRight: "16px", borderRadius: "4px" }}
            />
            <ListItemText
              primary="Smart Serum"
              secondary={
                <>
                  <Typography component="span" variant="body2">
                    $43.800,00
                  </Typography>
                  {" - "}
                  <Typography component="span" variant="body2" color="error">
                    $35.040,00
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider sx={{ my: 2 }} />
          <RadioGroup>
            <FormControlLabel
              value="domicilio"
              control={<Radio />}
              label="Correo Argentino Clásico - Envío a domicilio - $6.129,00"
            />
            <FormControlLabel
              value="retiro"
              control={<Radio />}
              label="Punto de retiro - $3.980,00"
            />
            <FormControlLabel
              value="local"
              control={<Radio />}
              label="PIEL STUDIO - PICK UP - Gratis"
            />
          </RadioGroup>
        </List>
        <Divider sx={{ my: 2 }} />
        <Box textAlign="center">
          <Button variant="contained" color="primary">
            Continuar con la compra
          </Button>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}
