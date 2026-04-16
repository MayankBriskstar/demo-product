import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Stack,
  Avatar
} from '@mui/material';
import {
  Inventory,
  AddBox,
  Logout,
  ListAlt,
  ManageAccounts
} from '@mui/icons-material';
import { authSvc } from '../services/api';

const drawerWidth = 260;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    authSvc.logout();
    navigate('/login');
  };

  const menuItems = [
    { text: 'All Items', icon: <ListAlt />, path: '/products' },
    { text: 'New Product', icon: <AddBox />, path: '/products/add' }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#1a1a1a', // Darker Grey
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                p: 1,
                borderRadius: 1,
                backgroundColor: 'primary.main',
                display: 'flex',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)'
              }}
            >
              <Inventory sx={{ fontSize: 24, color: 'white' }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
              Product Hub
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<Logout />}
              sx={{ backgroundColor: '#8b5cf6', color: '#fff', fontWeight: 600, opacity: 0.8, '&:hover': { opacity: 1 } }}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#121212', // Neutral Charcoal
            borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 1.5,
                    py: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      color: 'primary.light',
                      '& .MuiListItemIcon-root': { color: 'primary.light' },
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ '& .MuiTypography-root': { fontWeight: 600 } }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.05)' }} />

          <Box sx={{ p: 2, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 900, letterSpacing: '0.1em', display: 'block', mb: 0.5 }}>
              System Health
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 8px rgba(16, 185, 129, 0.4)',
                  animation: 'pulseStatus 2s infinite ease-in-out',
                  flexShrink: 0
                }}
              />
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600, lineHeight: 1 }}>
                Service Online
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 4, minHeight: '100vh', backgroundColor: '#121212' }}>
        <Toolbar />
        <Box sx={{ animation: 'fadeInApp 0.4s ease-out' }}>
          {children}
        </Box>
      </Box>

      <style>
        {`
          @keyframes fadeInApp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseStatus {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default Layout;
