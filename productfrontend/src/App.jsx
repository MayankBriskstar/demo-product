import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, GlobalStyles } from '@mui/material';

// Pages
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';

// Components
import Layout from './components/Layout';
import { authSvc } from './services/api';

// Create a Professional Charcoal/Purple Theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8b5cf6', // Soft Purple (600)
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    secondary: {
      main: '#ec4899', // Pinkish/Rose 600
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#121212', // Neutral Charcoal/Black
      paper: '#1a1a1a',   // Darker Grey
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    divider: 'rgba(255, 255, 255, 0.05)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '8px 24px',
          transition: 'all 0.1s ease-in-out',
        },
        containedPrimary: {
          backgroundColor: '#8b5cf6',
          '&:hover': {
             backgroundColor: '#7c3aed',
             boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
          }
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          color: '#94a3b8',
          padding: '16px',
        },
        body: {
          padding: '16px',
        }
      },
    },
  },
});

const ProtectedRoute = ({ children }) => {
  if (!authSvc.isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        body: {
          backgroundColor: '#121212',
          backgroundImage: 'radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.05) 0px, transparent 50%)',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        },
      }} />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
          <Route path="/products/add" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
