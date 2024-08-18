import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Container, Divider, Typography } from "@mui/material";
import ButtonAnimation from "@/animations/ButtonAnimation";
import { motion } from "framer-motion";
import FooterSocialLinks from "./footer-social-links";
import { footerMenuOne, footerMenuTwo, footerMenuThree } from "@/data/navigation";
import { Logo } from "@/components/logo";
import FooterSectionTitle from "./footer-section-title";
import ScrollToTheTop from "../buttons/ScrollToTheTop";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import ScrollToTopButton from "../buttons/ScrollToTheTop";

interface NavigationItemProps {
  label: string;
  path: string;
}

// const NavigationItem: FC<NavigationItemProps> = ({ label, path }) => {
//   return (
//     <Link href={path} passHref>
//       <Box>
//         {label}
//       </Box>
//     </Link>
//   );
// };

interface FooterProps {
  bgColor: 1 | 2 | 3;
}

const Footer: FC<FooterProps> = ({ bgColor }) => {
  const backgroundColors = {
    1: 'secondary.main',
    2: 'primary.dark',
    3: 'primary.light',
  };
  
  const labelColor = bgColor === 1 ? 'secondary.dark' : 'white';

  return (
    <Box sx={{ width: "100%", position: "relative", mt: "50px", pb: "10px"  }}>
    <Container sx={{ textAlign: "center" }}>
      <Typography sx={{ textAlign: "center", mb: "10px", fontWeight: "bold", fontSize: "20px", color: "primary.light" }}>
        Growth Prosperity Partners
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: "10px" }}>
      <Link href="/">
        <Box sx={{ mx: "20px", }}>
          <Typography sx={{'&:hover': {fontWeight: 'bold'}}}>Acceuil</Typography>
        </Box>
        </Link>
        <Link href="/">
        <Box sx={{ mx: "20px" }}>
          <Typography sx={{'&:hover': {fontWeight: 'bold'}}}>Nos produits</Typography>
        </Box>
        </Link>
        <Link href="/contact-us">
        <Box sx={{ mx: "20px" }}>
          <Typography sx={{'&:hover': {fontWeight: 'bold'}}}>Contact</Typography>
        </Box>
        </Link>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "25px", mb: "20px" }}>
        <Link href="https://www.facebook.com">
        <ButtonAnimation>
        <Box sx={{ mx: "20px", display: "flex", justifyContent: "center", alignItems: "center", width: "40px", height: "40px", borderRadius: "50%", color: "white", backgroundColor: "#1CA3EC"}}>
          <Image loading="lazy" src="/assets/icons/icon-fb.png" width={9} height={9} alt="product-dima" />
        </Box>
        </ButtonAnimation>
        </Link>
        <Link href="https://www.instagram.com">
        <ButtonAnimation>
        <Box sx={{ mx: "20px", display: "flex", justifyContent: "center", alignItems: "center", width: "40px", height: "40px", borderRadius: "50%", color: "white", backgroundColor: "#1CA3EC"}}>
          <Image loading="lazy" src="/assets/icons/icon-instagram.png" width={17} height={17} alt="product-dima" />
        </Box>
        </ButtonAnimation>
        </Link>
        
        <Link href="https://www.tiktok.com">
        <ButtonAnimation>
        <Box sx={{ mx: "20px", display: "flex", justifyContent: "center", alignItems: "center", width: "40px", height: "40px", color: "white", borderRadius: "50%", backgroundColor: "#1CA3EC"  }}>
          <Image loading="lazy" src="/assets/icons/icon-tiktok.png" width={15} height={15} alt="product-dima" />
        </Box>
        </ButtonAnimation>
        </Link>
      </Box>
      <Divider color="#1CA3EC" sx={{color:"#1CA3EC"}}/>
    </Container>
    <ScrollToTopButton />
    <Box className="footer">
      <Box className="waveFooter">
        <Typography sx={{ color: "black", fontSize: "12px", fontWeight: "bold", lineHeight: "normal", textAlign: "center", backgroundColor: "white", height: "40px", pt: "10px", }}>
          © {new Date().getFullYear()} SWIFTECH. All rights reserved.
        </Typography>
      </Box>
    </Box>
  </Box>
  );
}

export default Footer;
