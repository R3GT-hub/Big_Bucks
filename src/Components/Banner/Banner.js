import React from "react";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: "url(./banner2.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "400px", // Adjust the height as needed
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        // paddingTop:25
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            sx={{
              color: "white",
              fontFamily: "Montserrat",
              fontWeight: "800",
              marginBottom: 3,
            }}
            variant="h2"
          >
            Big_Bucks
          </Typography>
          <Typography
            sx={{
              color: "darkgrey",
              fontFamily: "Montserrat",
              fontWeight: "400",
            }}
            variant="subtitle"
          >
            Get All The Info Regarding your Favorite Crypto Currency
          </Typography>
        </div>

        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
