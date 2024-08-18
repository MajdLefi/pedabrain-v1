import React, { FC } from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
  bgColor: 1 | 2 | 3;
}

const FooterSectionTitle: FC<Props> = ({ title, bgColor }) => {
  const textColor = {
    1: 'secondary.main',
    2: 'primary.dark',
    3: 'primary.light',
  };

  const labelColor = bgColor === 1 ? 'secondary.dark' : 'white';

  return (
    <Box>
      <Typography sx={{color:labelColor}} className={`text-md font-semibold uppercase ${textColor[bgColor]}`}>
        {title}
      </Typography>
    </Box>
  );
};

export default FooterSectionTitle;
