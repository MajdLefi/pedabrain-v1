import React from "react";
import { Button, Box } from "@mui/material";

export default function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <Box sx={{display : {xs : "none", md:"block"},}}>
 <Button
      sx={{
        position: "absolute",
        top: "80px",
        right: "60px",
        border: "solid 1px #2563EB",
        color: "white",
        fontSize: "15px",
        fontWeight: "600",
        letterSpacing: "3px",
        lineHeight: "16px",
        overflow: "hidden",
        padding: "10px 30px",
        textTransform: "none",
        backgroundColor: "white",
        cursor: "pointer",
        borderRadius: "50%",
        height: "60px",
        width: "60px",
        "&:hover": {
          //backgroundColor: "#2563EB",
          "& .text svg": {
            fill: "#ffffff",
          },
          "& .waveContainer": {
            top: "0",
          },
        },
        "&:focus": {
          //backgroundColor: "#2563EB",
          "& .text svg": {
            fill: "#ffffff",
          },
          "& .waveContainer": {
            top: "0",
          },
        },
        "&:active": {
          //backgroundColor: "#2563EB",
          "& .text svg": {
            fill: "#ffffff",
          },
          "& .waveContainer": {
            top: "0",
          },
        },
      }}
      onClick={scrollToTop}
    >
      <Box
        className="text"
        sx={{
          position: "relative",
          transition: "color 0.3s ease",
          zIndex: 1,
        }}
      >
        <svg
          fill="#2563EB"
          height="22px"
          width="22px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 330 330"
          style={{ position: "relative", zIndex: 1 }}
        >
          <path
            id="XMLID_224_"
            d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"
          />
        </svg>
      </Box>
      <Box
        className="waveContainer"
        sx={{
          backgroundColor: "primary.dark",
          height: "100%",
          left: "0",
          position: "absolute",
          top: "calc(100% + 22px)",
          transition: "top 1s ease",
          width: "100%",
        }}
      >
        <Box
          className="wave"
          sx={{
            animation: "wave 0.5s linear infinite",
            backgroundImage: 'url("/assets/btns/pink-wave.png")',
            backgroundSize: "contain",
            content: '""',
            height: "22px",
            left: "0",
            position: "absolute",
            top: "-22px",
            width: "100%",
          }}
        />
      </Box>
      <style jsx global>{`
        @keyframes wave {
          to {
            background-position-x: 118px;
          }
        }
      `}</style>
    </Button>
    </Box>
   
  );
}
