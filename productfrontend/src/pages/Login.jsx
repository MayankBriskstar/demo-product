import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  InputAdornment
} from '@mui/material';
import { Person, VpnKey, Inventory } from '@mui/icons-material';
import { authSvc } from '../services/api';

const Login = () => {
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      await authSvc.login(data.get('user'), data.get('pass'));
      navigate('/products');
    } catch {
      setMsg('Invalid username or password.');
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#121212', // Neutral Deep Charcoal/Black
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)', // Subtle Purple Glow
        top: '-20%',
        left: '-20%',
      }
    }}>
      <Container maxWidth="sm" sx={{ zIndex: 1 }}> {/* Changed from xs to sm for wider box */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 4, sm: 6 }, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            borderRadius: 3,
            backgroundColor: 'rgba(30, 30, 30, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            width: '100%',
            maxWidth: 480, // Explicit wider width
            mx: 'auto'
          }}
        >
          <Box 
            sx={{ 
              width: 64,
              height: 64,
              borderRadius: 2, 
              background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)', // Vibrant Purple/Pink
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(139, 92, 246, 0.3)'
            }}
          >
            <Inventory sx={{ fontSize: 32, color: 'white' }} /> {/* Icon centered via flexbox on parent */}
          </Box>
          
          <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 800 }}>
            Sign In
          </Typography>
          <Typography variant="body2" sx={{ mb: 5, color: 'text.secondary', textAlign: 'center' }}>
            Enter your credentials to access the Product Hub
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Username"
              name="user"
              autoComplete="username"
              autoFocus
              defaultValue="admin"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pass"
              label="Password"
              type="password"
              id="pass"
              autoComplete="current-password"
              defaultValue="password123"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKey fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
            
            {msg && <Alert severity="error" sx={{ mt: 2 }}>{msg}</Alert>}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                mt: 5, 
                mb: 3, 
                py: 1.8, 
                fontSize: '1rem', 
                fontWeight: 700, 
                backgroundColor: '#8b5cf6',
                '&:hover': { backgroundColor: '#7c3aed' }
              }}
            >
              Access Dashboard
            </Button>
            
            <Box sx={{ mt: 2, p: 2, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.03)', textAlign: 'center' }}>
               <Typography variant="caption" color="text.secondary">
                Quick Access: <strong>admin / password123</strong>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
