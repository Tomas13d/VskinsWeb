import React from "react";
import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import { Instagram } from "@mui/icons-material";
import Image from "next/image";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        backgroundColor: "#000",
        color: "#fff",
        textAlign: "center",
      }}
    >
              <Image
            src="/VskinsWhite.svg"
            alt="Vskins Logo"
            width={105}
            height={37}
            priority
          />
      <Container maxWidth="lg">

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
        
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2, marginTop: "20px" }}>
            <Link href="/productos/power-serum" underline="none" sx={{ mx: 1, color: "#fff" }}>
              Serum
            </Link>
            <Link href="/productos/power-cream" underline="none" sx={{ mx: 1, color: "#fff" }}>
              Crema
            </Link>
          </Box>
          <Box>
            <IconButton
              href="https://www.instagram.com/vskins_"
              sx={{ color: "#fff" }}
              target="_blank"
            >
              <Instagram />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" sx={{color: "#fff", fontWeight: 200}}>
          © 2024 Vskins. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
