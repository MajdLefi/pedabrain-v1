"use client";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/home-page/Map"), { ssr: false });
import { Grid, Box } from "@mui/material";
import ContactForm from "./ContactForm";
import Transition from "@/animations/Transition";

export default function ContactUs() {
  return (
    <Box>
      <Box sx={{ boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.17)'}}>
        <Grid container sx={{ backgroundColor: { xs: "none", md: 'white' } ,borderRadius:"24px",boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.17)', }} spacing={3}>
          <Grid item xs={12} md={6} sx={{ pb: '20px', }} >
            <Box sx={{backgroundColor:"white"}}>
              <ContactForm />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{borderRadius:"24px", borderTopRightRadius:"24px 24px",}}>
            <Map />
          </Grid>
        </Grid>
      </Box>
    
    </Box>
  );
}
