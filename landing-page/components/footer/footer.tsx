import React, { FC } from "react";
import Link from "next/link";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import FooterSocialLinks from "./footer-social-links";
import { footerMenuOne, footerMenuTwo, footerMenuThree } from "@/data/navigation";
import { Logo } from "@/components/logo";
import FooterSectionTitle from "./footer-section-title";
import ScrollToTopButton from "../buttons/ScrollToTheTop";

interface NavigationItemProps {
  label: string;
  path: string;
}

const NavigationItem: FC<NavigationItemProps> = ({ label, path }) => {
  return (
    <Link href={path} passHref>
      <Box sx={{mb:"18px", color:"WHITE"}}>
          {/* <Link
            className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:hover:text-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href="/bootcamp/MERN-STACK"
          > */}
            {label}
          {/* </Link> */}
      </Box>
    </Link>
  );
};

const Footer: FC = () => {
  return (
    <Box sx={{ width: "100%", backgroundColor:"#75c4ee",pt:"-50px"  }}>
      <Container sx={{py:"80px"}}>
        <Box className="w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
          <Box>
            <Grid container sx={{}} spacing={3}>
            <Grid item md={6}>
              <Box className="" sx={{}}>
                {/* <Logo /> */}
                <Typography variant="subtitle1" sx={{  mb: 2, fontSize:"24px", fontWeight:"700" }}>PEDABRAIN</Typography>
                <Typography variant="subtitle1" sx={{ letterSpacing: 1, fontSize:"16px", mb:"19px", fontWeight:"500", color:"WHITE"}}>DESCRIPTION</Typography>
                <FooterSocialLinks />
            </Box>
            </Grid>
            <Grid item xs={4} md={2}>
              <Box sx={{pt:"0px"}}>
                <FooterSectionTitle title="Company" />
                {footerMenuOne.map(({ label, path }, index) => (
                  <NavigationItem key={index + path} label={label} path={"#"} />
                ))}
            </Box>
            </Grid>
            <Grid item xs={4} md={2}>
            <Box sx={{pt:"0px"}}>
              <FooterSectionTitle title="Contact" />
              {footerMenuTwo.map(({ label, path }, index) => (
                <NavigationItem key={index + path} label={label} path={"#"} />
              ))}
            </Box>
            </Grid>
            <Grid item xs={4} md={2}>
            <Box sx={{pt:"0px"}}>
              <FooterSectionTitle title="More" />
              {footerMenuThree.map(({ label, path }, index) => (
                <NavigationItem key={index + path} label={label} path={"#"} />
              ))}
            </Box>
            </Grid>
            </Grid>
          </Box>
        </Box>
      {/* <ScrollToTopButton /> */}
              {/* <SocialMediaIcons /> */}
      </Container>
      {/* <Box className="w-full h-10 bg-blue-600">
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold", textAlign: "center", pt: "10px" }}>
          © {new Date().getFullYear()} Digid
          All Rights Reserved
        </Typography>
      </Box> */}
       <Container>
        <Divider color="white" sx={{color:"white"}}/>
      </Container>
      <Box sx={{py:"10px", fontSize:"14px"}}>
        <Box>
        <Typography sx={{ color: "white", fontWeight: "500", textAlign: "center",  }}>
          © {new Date().getFullYear()} PEDABRAIN. All rights reserved.
        </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer
