import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <div>
      <AppBar position="fixed" style={{ width: '100%' }}>       
       <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => toggleDrawer(true)}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Ruhama Library
        </Typography>
        <Button color="inherit" component={Link} to="/bookList" sx={{ display: { xs: 'none', md: 'block' } }}>
          Book
        </Button>
        <Button color="inherit" component={Link} to="/borrowing" sx={{ display: { xs: 'none', md: 'block' } }}>
          Borrowing
        </Button>
        {/* <Button color="inherit" component={Link} to="/publisher" sx={{ display: { xs: 'none', md: 'block' } }}>
          Publisher
        </Button> */}
        <Button color="inherit" component={Link} to="/readerList" sx={{ display: { xs: 'none', md: 'block' } }}>
          Reader
        </Button>
      </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <List>
          <ListItemButton component={Link} to="/bookList" onClick={() => toggleDrawer(false)}>
            Book
          </ListItemButton>
          <ListItemButton component={Link} to="/borrowing" onClick={() => toggleDrawer(false)}>
            Borrowing
          </ListItemButton>
          {/* <ListItemButton component={Link} to="/publisher" onClick={() => toggleDrawer(false)}>
            Publisher
          </ListItemButton> */}
          <ListItemButton component={Link} to="/reader" onClick={() => toggleDrawer(false)}>
            Reader
          </ListItemButton>
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
