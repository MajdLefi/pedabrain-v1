import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import ContactMap from '@/components/home-page/contact'
export default function ContactUs() {
  return (
    <Container sx={{mb:"100px"}}>
      <Typography
        sx={{
          fontSize: "56px",
          textAlign: "center",
          color: "black",
          fontWeight: "bold",
          mb: "15px",
        }}
      >
        Contacter <span style={{ color: "#ffd328" }}>PEDABRAIN</span>{" "}
      </Typography>
      <Grid container spacing={3} sx={{mb:"100px"}}>
      <Grid item xs={12} md={4}>
        <Box sx={{border:"solid #ffd328 1px", borderRadius:"25px"}}>
            <Box sx={{ display: "flex", m:"0 auto 0 auto", justifyContent:"center",py:"30px"}}>
                <Image src="/assets/contact/time.gif" width={100} height={250} alt="character-about-us" />
            </Box>
            <Box sx={{textAlign:"center"}}>
                <Typography sx={{fontSize:"28px", fontWeight:"bold", mb:"20px"}}>Heures de Travail</Typography>
                <Typography>lundi - Jeudi: 08:00 am to 17:00 pm <br/>Samedi: 08:00 am to 17:00 pm</Typography>
            </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{border:"solid #ffd328 1px", borderRadius:"25px", pb:"20px"}}>
            <Box sx={{display: "flex", m:"0 auto 0 auto", justifyContent:"center",py:"40px"}}>
                <Image src="/assets/contact/email.gif" width={80} height={250} alt="character-about-us" />
            </Box>
            <Box sx={{textAlign:"center"}}>
                <Typography sx={{fontSize:"28px", fontWeight:"bold", mb:"20px"}}>Email</Typography>
                <Typography>eyaghenimi95@gmail.com</Typography>
            </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{border:"solid #ffd328 1px", borderRadius:"25px", pb:"20px"}}>
            <Box sx={{mb:"20px", display: "flex", m:"0 auto 0 auto", justifyContent:"center",py:"40px"}}>
                <Image src="/assets/contact/phone.gif" width={80} height={250} alt="character-about-us" />
            </Box>
            <Box sx={{textAlign:"center"}}>
                <Typography sx={{fontSize:"28px", fontWeight:"bold", mb:"20px"}}>Numéro de Téléphone</Typography>
                <Typography>+216 99 262 285</Typography>
            </Box>
        </Box>
      </Grid>
      </Grid>
      <ContactMap />
    </Container>
  );
}
