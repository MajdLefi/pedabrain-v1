import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Box, Toolbar, Typography, Container, IconButton, Drawer, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { navigations } from '@/data/navigation';
import { Logo } from '@/components/logo';
import LoginIcon from '@mui/icons-material/Login';

interface HeaderProps {
  bgColor: 1 | 2 | 3;
}

const Header: FC<HeaderProps> = ({ bgColor }) => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const backgroundColors = {
    1: '#75c4ee',
    2: '#75c4ee',
    3: '#75c4ee',
  };

  const labelColor = bgColor === 1 ? 'secondary.dark' : 'white';

  const longestNavLabel = navigations.reduce((acc, nav) => (nav.label.length > acc.length ? nav.label : acc), "");
  const fixedWidth = `${longestNavLabel.length * 10}px`;

  return (
    <Box sx={{ mb: 8.5, zIndex: 9999 }}>
      <AppBar sx={{ backgroundColor: backgroundColors[bgColor], color: 'white', boxShadow: 'none', width: '100%', height: '70px' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
              <Logo />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                {navigations.map((nav, index) => {
                  const isActive = router.pathname === nav.path;
                  const isNosProduitsActive = (router.pathname === '/dima' || router.pathname === '/elixir') && nav.label === 'Nos produits';

                  let backgroundColor = 'transparent';
                  let color = labelColor;

                  if (isNosProduitsActive) {
                    if (router.pathname === '/dima') {
                      backgroundColor = '#e73797';
                      color = 'white';
                    } else if (router.pathname === '/elixir') {
                      backgroundColor = '#D6E9F7';
                      color = '#8AB3DF';
                    }
                  } else if (isActive) {
                    backgroundColor = '#df1a5c';
                    color = 'white';
                  }

                  return (
                    <Link key={index} href={nav.label === 'Nos produits' ? '/#products' : nav.path} passHref>
                      <Box
                        sx={{ mx: 2, padding: '14px 6px', backgroundColor, borderRadius: '8px', textAlign: 'center',
                          '&:hover': { fontWeight: 'bold', cursor: 'pointer' },
                        }}
                      >
                        <Typography sx={{ fontSize: '17px', lineHeight: '24px', color, display: 'block', width: fixedWidth }}>
                          {nav.label}
                        </Typography>
                      </Box>
                    </Link>
                  );
                })}
              </Box>
              <Link href="https://pedabrain-backoffice.vercel.app/login">
              <Button sx={{backgroundColor:"#df1a5c", textTransform:"none"}} variant="contained" endIcon={<LoginIcon />}>
                Login
              </Button>
              </Link>
            </Box>
            {/* <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
              <IconButton size="large" aria-label="menu" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleDrawerToggle} sx={{ color: 'black' }}>
                <MenuIcon />
              </IconButton>
            </Box> */}
            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
              <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
                <List>
                  {navigations.map((nav, index) => (
                    <Box>
                    <Box sx={{display:'flex'}}>
                      {nav.icon && <nav.icon sx={{ ml: 2, mt:"10px" }} />}
                    <ListItem button key={index} component="a" href={nav.label === 'Nos produits' ? '/#products' : nav.path}>
                      <ListItemText primary={nav.label} />
                    </ListItem>
                    </Box>

                    <Divider sx={{width:"100%"}}/>
                    </Box>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
