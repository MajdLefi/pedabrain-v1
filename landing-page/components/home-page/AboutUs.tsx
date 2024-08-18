
import Image from "next/image";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

export default function Herosection() {
  return (
    <Box sx={{backgroundColor:"#1d1c1c", mb:"100px"}}>
      <Container maxWidth="xl" sx={{py:'30px'}}>
      <Typography sx={{fontSize:"56px", textAlign:"center", color:"white", fontWeight:"bold", mb:"15px"}}>A propos de <span style={{color:"#ffd328"}}>nous</span> </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Box sx={{}}>
          <Image src="/assets/characters/about-us.png" width={400} height={250} alt="character-about-us" />
        </Box>
      </Grid>
        <Grid item xs={12} md={6} sx={{color:"white", mt:"50px"}}>
         <Typography sx={{fontSize:"36px", fontWeight:"bold", mb:"15px"}}>Exploration, Croissance et Épanouissement Ensemble </Typography>
         <Typography sx={{fontSize:"18px", mb:"20px"}}>Nous sommes dédiés à 
          accompagner chaque enfant dans son voyage vers le succès. 
          Notre approche centrée sur l'enfant vise à encourager la curiosité,
          à favoriser la confiance en soi et à promouvoir l'indépendance.
          Explorez nos services et rejoignez-nous pour une expérience 
          d'apprentissage transformative où chaque enfant peut explorer, grandir et s'épanouir.</Typography>
         <Button variant="contained" sx={{backgroundColor:"primary.light", textTransform:"none"}}>Lire la suite</Button>
        </Grid>
      </Grid>
      </Container>
    </Box>
  );
}

