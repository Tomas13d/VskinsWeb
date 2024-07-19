import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function Carrousel() {
  const images = ["/Serum.jpeg", "/Serum.jpeg", "/Serum.jpeg"];

  const ArrowButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    color: "#000",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },
  }));
  const PrevArrow = styled(ArrowButton)(({ theme }) => ({
    left: theme.spacing(1),
  }));

  const NextArrow = styled(ArrowButton)(({ theme }) => ({
    right: theme.spacing(1),
  }));

  return (
    <Carousel
      showArrows={true}
      thumbWidth={65}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <PrevArrow onClick={onClickHandler} aria-label={label}>
            <ChevronLeftIcon />
          </PrevArrow>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <NextArrow onClick={onClickHandler} aria-label={label}>
            <ChevronRightIcon />
          </NextArrow>
        )
      }
    >
      {images.map((item) => (
        <div>
          <img src={item} />
        </div>
      ))}
    </Carousel>
  );
}
