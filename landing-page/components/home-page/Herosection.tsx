import Image from "next/image";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

export default function Herosection() {
  return (
    <Container sx={{mb:"100px"}}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sx={{mt:'180px'}}>
         <Typography sx={{fontSize:"36px", fontWeight:"bold", mb:"15px"}}>Bienvenue dans <br/> <span style={{color:"#df1a5c"}}>Pedabrain</span> </Typography>
         <Typography sx={{fontSize:"18px", mb:"20px"}}>Cabinet d'Éducation Spécialisée, où chaque enfant est accueilli avec compassion et soutenu dans son développement unique. Notre équipe dévouée offre un accompagnement personnalisé pour favoriser le bien-être et l'épanouissement des enfants confrontés à des troubles mentaux. Découvrez nos services et rencontrez notre équipe dédiée dès maintenant.</Typography>
         <Button variant="contained" sx={{backgroundColor:"primary.light", textTransform:"none"}}>En savoir plus</Button>
        </Grid>
        <Grid item xs={12} md={6}>
        <Box sx={{}}>
          <Image src="/assets/characters/herosection.png" width={450} height={250} alt="character-about-us" />
        </Box>
      </Grid>
      </Grid>
    </Container>
  );
}
