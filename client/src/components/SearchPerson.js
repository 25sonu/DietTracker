import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PersonCard from './PersonCard';
import axios from 'axios';

 // Access environment variable
// const URL = process.env.REACT_APP_URL; 

const SearchPerson = () => {
  const [person, setPerson] = useState([]);
  const [filteredPerson, setFilteredPerson] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchTerm: '',
    searchField: 'name', // Matches CreatePerson
    sortBy: 'name', // Matches CreatePerson
    sortOrder: 'asc',
  });

  useEffect(() => {
    axios
      .get(`https://diettracker-1zc0.onrender.com/api/diets`)
      .then((res) => {
        setPerson(res.data);
        setFilteredPerson(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching persons:', err);
        setLoading(false);
      });
  }, []);

  const applyFilters = useCallback(() => {
    let result = [...person];

    // Search filter
    if (filters.searchTerm) {
      result = result.filter((person) => {
        const searchValue = person[filters.searchField]?.toString().toLowerCase();
        return searchValue?.includes(filters.searchTerm.toLowerCase());
      });
    }

    // Sorting
    result.sort((a, b) => {
      let valueA = a[filters.sortBy]?.toString().toLowerCase();
      let valueB = b[filters.sortBy]?.toString().toLowerCase();

      if (valueA < valueB) return filters.sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return filters.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredPerson(result);
  }, [filters, person]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      searchField: 'name',
      sortBy: 'name',
      sortOrder: 'asc',
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3, mt: 5, bgcolor: 'background.default', borderRadius: 2 }}>
      <Typography variant="h4" align="center" color="text.primary" gutterBottom>
        Search Person
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" gutterBottom>
        Find a person record from the database
      </Typography>

      {/* Search and Filter Section */}
      <Card sx={{ p: 3, mt: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            {/* Search Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Search"
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{ bgcolor: 'background.default', borderRadius: 1 }}
              />
            </Grid>

            {/* Search By Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Search By</InputLabel>
                <Select
                  value={filters.searchField}
                  label="Search By"
                  onChange={(e) => setFilters({ ...filters, searchField: e.target.value })}
                  sx={{ bgcolor: 'background.default', borderRadius: 1 }}
                >
                  <MenuItem value="Person_name"> Name</MenuItem>
                  <MenuItem value="age">Age</MenuItem>
                  <MenuItem value="gender">Weight</MenuItem>
                  <MenuItem value="contact_number">bmi</MenuItem>
                  <MenuItem value="admit_Date">Contact_number</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Sort By Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={filters.sortBy}
                  label="Sort By"
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  sx={{ bgcolor: 'background.default', borderRadius: 1 }}
                >
                  <MenuItem value="Person_name"> Name</MenuItem>
                  <MenuItem value="age">Age</MenuItem>
                  <MenuItem value="gender">Weight</MenuItem>
                  <MenuItem value="admit_Date">bmi</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Sort Order */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Order</InputLabel>
                <Select
                  value={filters.sortOrder}
                  label="Order"
                  onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
                  sx={{ bgcolor: 'background.default', borderRadius: 1 }}
                >
                  <MenuItem value="asc">Ascending</MenuItem>
                  <MenuItem value="desc">Descending</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Reset Filters Button */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="outlined"
                  startIcon={<RestartAltIcon />}
                  onClick={resetFilters}
                  sx={{ mt: 2, borderRadius: 1 }}
                >
                  Reset Filters
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Results Section */}
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        Found {filteredPerson.length} person
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {filteredPerson.map((person) => (
          <Grid item xs={12} sm={6} md={4} key={person._id}>
            <PersonCard person={person} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchPerson;