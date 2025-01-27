import { AppBar, Badge, Box, IconButton, Toolbar } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";

export default function PrimarySearchAppBar({
  setOpenCart,
  setReloadCart,
  cartLength,
}) {
  return (
    <Box
      sx={{ flexGrow: 1, position: "fixed", zIndex: 10, top: 0, width: "100%" }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#000", color: "#fff", p:1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Image
            src="/tdshoesLogo.png"
            alt="tdShoes"
            width={37}
            height={35}
            priority
          />
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => {
                setOpenCart(true);
                setReloadCart((p) => !p);
              }}
            >
              <Badge
                badgeContent={cartLength}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#BAC61B",
                    color: "white",
                  },
                }}
              >
                <ShoppingBagIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
