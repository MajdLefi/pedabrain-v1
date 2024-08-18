import * as React from 'react';
import { Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { navigations } from "@/data/navigation";

export default function DrawerComponent() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const handleDrawerToggle = () => {
      setDrawerOpen(!drawerOpen);
    };
  
  return (
    <Box>
      <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
        <IconButton size="large" aria-label="menu" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleDrawerToggle} sx={{ color: "white" }} >
          <MenuIcon />
        </IconButton>
      </Box>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle} PaperProps={{ sx: { width: '100%', backgroundColor:"red" } }}>
        <Box sx={{ width: '100%' }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
          <List>
            {navigations.map((nav, index) => (
              <ListItem button key={index} component="a" href={nav.path}>
                <ListItemText primary={nav.path} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
