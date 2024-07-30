import React from "react";
import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import { Instagram } from "@mui/icons-material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Image from "next/image";

const Footer = ({ saler }) => {
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
        src="/tdshoesLogo.png"
        alt="tdShoes"
        width={37}
        height={35}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
              marginTop: "20px",
            }}
          >
            <Link
              href={`/productos/adidas-campus${saler ? `?saler=${saler}` : ""}`}
              underline="none"
              sx={{ mx: 1, color: "#fff" }}
            >
              Campus
            </Link>
          </Box>
          <Box>
            <IconButton
              href="https://www.instagram.com/tdshoes.ok/"
              sx={{ color: "#fff" }}
              target="_blank"
            >
              <Instagram />
            </IconButton>
            <IconButton
              href="https://wa.me/5493516368347"
              sx={{ color: "#fff" }}
              target="_blank"
            >
              <WhatsAppIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ color: "#fff", fontWeight: 200 }}>
          © 2024 tdshoes. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
