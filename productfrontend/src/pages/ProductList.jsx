import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Chip,
  InputAdornment,
  Toolbar
} from '@mui/material';
import { FilterList, ShoppingBag } from '@mui/icons-material';
import { apiSvc } from '../services/api';

const ProductList = () => {
  const [items, setItems] = useState([]);
  const [colors, setColors] = useState([]);
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setBusy(true);
    try {
      const data = await apiSvc.getItems();
      setItems(data);
      const unique = [...new Set(data.map(i => i.color))].filter(c => c);
      setColors(unique);
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  const handleFilterChange = async (event) => {
    const color = event.target.value;
    setFilter(color);
    setBusy(true);
    try {
      const data = color ? await apiSvc.getByColor(color) : await apiSvc.getItems();
      setItems(data);
    } catch {
      console.error('Filter error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box sx={{ animation: 'fadeInTab 0.4s ease-out' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: 'rgba(139, 92, 246, 0.1)' }}>
            <ShoppingBag sx={{ color: '#8b5cf6' }} />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
              Inventory
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Managing {items.length} unique items
            </Typography>
          </Box>
        </Box>
        
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel id="color-filter-label">Filter by Color</InputLabel>
          <Select
            labelId="color-filter-label"
            id="color-filter"
            value={filter}
            label="Filter by Color"
            onChange={handleFilterChange}
            startAdornment={
               <InputAdornment position="start">
                <FilterList fontSize="small" color="action" />
              </InputAdornment>
            }
          >
            <MenuItem value=""><em>All Products</em></MenuItem>
            {colors.map(c => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, border: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: '#1a1a1a', overflow: 'hidden' }}>
        {busy ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
            <CircularProgress size={32} sx={{ color: '#8b5cf6' }} />
          </Box>
        ) : (
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
              <TableRow>
                <TableCell sx={{ pl: 4, py: 2 }}>PRODUCT NAME</TableCell>
                <TableCell sx={{ py: 2 }}>COLOR</TableCell>
                <TableCell sx={{ pr: 4, py: 2 }} align="right">UNIT PRICE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                  <TableCell sx={{ pl: 4 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                    <Typography variant="caption" color="text.secondary">ID: PRD-{item.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={item.color} 
                      size="small" 
                      variant="outlined" 
                      sx={{ 
                        borderRadius: 1, 
                        fontWeight: 700, 
                        fontSize: '0.7rem', 
                        color: '#8b5cf6',
                        borderColor: 'rgba(139, 92, 246, 0.2)',
                        bgcolor: 'rgba(139, 92, 246, 0.02)'
                      }} 
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ pr: 4 }}>
                    <Typography variant="body1" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                      ${item.price.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 10 }}>
                    <Typography variant="body2" color="text.secondary">No items found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default ProductList;
