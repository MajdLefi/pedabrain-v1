import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from '@mui/icons-material/X';

export default function OurTeam() {
  return (
    <Container maxWidth="xl" sx={{mb:'100px'}}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Box sx={{border:"solid black 1px", borderRadius:"25px", textAlign:"center", pb:'15px'}}>
            <Box sx={{display: "flex", m:"0 auto 0 auto", justifyContent:"center", mb:"15px"}}>
              <Image src="/assets/team/ichrak.png" width={200} height={250} alt="character-team" />
            </Box>
            <Box>
              <Typography sx={{fontSize:"24px", mb:"15px"}}>Benarbia Ichrak</Typography>
              <Typography sx={{ mb:"15px"}}>Educatrice</Typography>
            </Box>
            <Box sx={{ display: "flex", m:"0 auto 0 auto", px:"90px" }}>
              <FacebookIcon sx={{mr:"30px"}} fontSize="large"/>
              <LinkedInIcon sx={{mr:"30px"}} fontSize="large"/>
              <XIcon fontSize="large"/>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{border:"solid black 1px", borderRadius:"25px", textAlign:"center", pb:'15px'}}>
            <Box sx={{display: "flex", m:"0 auto 0 auto", justifyContent:"center", mb:"15px"}}>
              <Image src="/assets/team/ichrak.png" width={200} height={250} alt="character-team" />
            </Box>
            <Box>
              <Typography sx={{fontSize:"24px", mb:"15px"}}>Benarbia Ichrak</Typography>
              <Typography sx={{ mb:"15px"}}>Educatrice</Typography>
            </Box>
            <Box sx={{ display: "flex", m:"0 auto 0 auto", px:"90px" }}>
              <FacebookIcon sx={{mr:"30px"}} fontSize="large"/>
              <LinkedInIcon sx={{mr:"30px"}} fontSize="large"/>
              <XIcon fontSize="large"/>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{border:"solid black 1px", borderRadius:"25px", textAlign:"center", pb:'15px'}}>
            <Box sx={{display: "flex", m:"0 auto 0 auto", justifyContent:"center", mb:"15px"}}>
              <Image src="/assets/team/ichrak.png" width={200} height={250} alt="character-team" />
            </Box>
            <Box>
              <Typography sx={{fontSize:"24px", mb:"15px"}}>Benarbia Ichrak</Typography>
              <Typography sx={{ mb:"15px"}}>Educatrice</Typography>
            </Box>
            <Box sx={{ display: "flex", m:"0 auto 0 auto", px:"90px" }}>
              <FacebookIcon sx={{mr:"30px"}} fontSize="large"/>
              <LinkedInIcon sx={{mr:"30px"}} fontSize="large"/>
              <XIcon fontSize="large"/>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{border:"solid black 1px", borderRadius:"25px", textAlign:"center", pb:'15px'}}>
            <Box sx={{display: "flex", m:"0 auto 0 auto", justifyContent:"center", mb:"15px"}}>
              <Image src="/assets/team/eya.png" width={350} height={250} alt="character-team" />
            </Box>
            <Box>
              <Typography sx={{fontSize:"24px", mb:"15px"}}>Benarbia Ichrak</Typography>
              <Typography sx={{ mb:"15px"}}>Educatrice</Typography>
            </Box>
            <Box sx={{ display: "flex", m:"0 auto 0 auto", px:"90px" }}>
              <FacebookIcon sx={{mr:"30px"}} fontSize="large"/>
              <LinkedInIcon sx={{mr:"30px"}} fontSize="large"/>
              <XIcon fontSize="large"/>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
