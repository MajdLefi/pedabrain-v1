import React, { FC } from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
}

const FooterSectionTitle: FC<Props> = ({ title }) => {

  return (
    <Box sx={{mb:'32px', color:"#222222"}}>
      <Typography sx={{fontSize:"18px", fontWeight:"600"}}>
        {title}
      </Typography>
    </Box>
  );
};

export default FooterSectionTitle;
