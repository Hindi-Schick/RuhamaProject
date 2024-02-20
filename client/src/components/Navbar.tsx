import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

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
            <AutoStoriesIcon sx={{ marginRight: '8px' }} />
            Ruhama Library
          </Typography>
          <Button color="inherit" component={Link} to="/bookList" sx={{ display: { xs: 'none', md: 'block' } }}>
            Book
          </Button>
          <Button color="inherit" component={Link} to="/borrowing" sx={{ display: { xs: 'none', md: 'block' } }}>
            Borrowing
          </Button>
          <Button color="inherit" component={Link} to="/readerList" sx={{ display: { xs: 'none', md: 'block' } }}>
            Reader
          </Button>
          <Button color="inherit" component={Link} to="/topTen" sx={{ display: { xs: 'none', md: 'block' } }}>
            Top 10
          </Button>
          <Button color="inherit" component={Link} to="/overdueReaders" sx={{ display: { xs: 'none', md: 'block' } }}>
            Overdue Readers
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
          <ListItemButton component={Link} to="/readerList" onClick={() => toggleDrawer(false)}>
            Reader
          </ListItemButton>
          <ListItemButton component={Link} to="/topTen" onClick={() => toggleDrawer(false)}>
            Top 10
          </ListItemButton>
          <ListItemButton component={Link} to="/overdueReaders" onClick={() => toggleDrawer(false)}>
            Overdue Readers
          </ListItemButton>
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
