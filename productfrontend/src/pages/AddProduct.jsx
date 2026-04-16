import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Breadcrumbs,
  Link,
  Alert,
  InputAdornment,
  Stack,
  Snackbar
} from '@mui/material';
import { Save, ArrowBack, Sell, Palette, AttachMoney } from '@mui/icons-material';
import { apiSvc } from '../services/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', price: '', color: 'Black' });
  const [status, setStatus] = useState({ open: false, type: 'success', text: '' });

  const predefinedColors = ['Black', 'Silver', 'White', 'Blue', 'Red', 'Green', 'Yellow'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || form.price <= 0) {
      setStatus({ open: true, type: 'error', text: 'Please provide a valid name and price.' });
      return;
    }

    try {
      await apiSvc.add({
        name: form.name,
        price: parseFloat(form.price),
        color: form.color
      });
      setStatus({ open: true, type: 'success', text: 'Product added successfully!' });
      setTimeout(() => navigate('/products'), 1000); // Small delay to show success
    } catch {
      setStatus({ open: true, type: 'error', text: 'Failed to add product. Please try again.' });
    }
  };

  const handleClose = () => setStatus({ ...status, open: false });

  return (
    <Box sx={{ animation: 'fadeInTab 0.4s ease-out' }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          underline="hover"
          color="inherit"
          href="#"
          onClick={(e) => { e.preventDefault(); navigate('/products'); }}
          sx={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}
        >
          <ArrowBack sx={{ mr: 0.5 }} fontSize="inherit" />
          Back to Inventory
        </Link>
        <Typography color="text.primary" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Create New Product</Typography>
      </Breadcrumbs>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          New Item Entry
        </Typography>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          p: 6,
          borderRadius: 2,
          maxWidth: 680,
          border: '1px solid rgba(255, 255, 255, 0.05)',
          backgroundColor: '#1a1a1a'
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              label="Product Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Premium Hub"
            />

            <TextField
              select
              required
              fullWidth
              label="Product Color"
              value={form.color}
              onChange={e => setForm({ ...form, color: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Palette fontSize="small" sx={{ color: 'primary.light' }} />
                  </InputAdornment>
                ),
              }}
            >
              {predefinedColors.map(c => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </TextField>

            <TextField
              required
              fullWidth
              type="number"
              label="Unit Price ($)"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              inputProps={{ step: "0.01", min: "0" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney fontSize="small" sx={{ color: 'secondary.main' }} />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Save />}
                sx={{
                  px: 6,
                  py: 1.5,
                  fontWeight: 700,
                  backgroundColor: '#8b5cf6',
                  '&:hover': { backgroundColor: '#7c3aed' }
                }}
              >
                Confirm & Save
              </Button>
              <Button
                variant="text"
                size="large"
                onClick={() => navigate('/products')}
                sx={{ color: '#fff', backgroundColor: '#b61414ff' }}
              >
                Cancel
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>

      <Snackbar
        open={status.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={status.type} sx={{ width: '100%', borderRadius: 1.5 }}>
          {status.text}
        </Alert>
      </Snackbar>

      <style>
        {`
          @keyframes fadeInTab {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </Box>
  );
};

export default AddProduct;
