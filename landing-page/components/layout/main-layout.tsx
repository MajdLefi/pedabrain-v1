import React, { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import {Footer} from '@/components/footer';
import {Header} from '@/components/header';

interface Props {
  children: ReactNode;
  headerBgColor: 1 | 2 | 3;
  footerBgColor: 1 | 2 | 3;
}

const MainLayout: FC<Props> = ({ children, headerBgColor, footerBgColor }) => {
  return (
    <Box component="main" sx={{position:"relative"}}>
      <Header bgColor={headerBgColor} />
      {children}
      <Footer />
    </Box>
  );
};

export default MainLayout;
