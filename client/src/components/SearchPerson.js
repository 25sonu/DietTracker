// // src/components/Searchperson.js
// import React, { useState, useEffect } from 'react';
// import {
//     Container,
//     TextField,
//     Typography,
//     Box,
//     Card,
//     CardContent,
//     Grid,
//     MenuItem,
//     Select,
//     FormControl,
//     InputLabel,
//     Button,
//     CircularProgress
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import RestartAltIcon from '@mui/icons-material/RestartAlt';
// import PersonCard from './PersonCard';
// import axios from 'axios';

// const SearchPerson = () => {
//     const [person, setPerson] = useState([]);
//     const [filteredPerson, setFilteredPerson] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [contact_number, setContact_number] = useState([]);

//     const [filters, setFilters] = useState({
//         searchTerm: "",
//         searchField: "food_name",
//         sortBy: "food_name",
//         sortOrder: "asc",
//         contact_number:"all"
//     });
    
//     useEffect(()=>{
//         axios.get('https://diettracker-1zc0.onrender.com/api/diets')
//         .then(res => {
//             setPerson(res.data);
//             setFilteredPerson(res.data);
//             // Extract unique contact_number
//             const uniqueContact_number = [...new Set(res.data.map(person => person.contact_number))];
//             setContact_number(uniqueContact_number);
//             setLoading(false);
//     })
//     .catch((err) => {
//         console.error('Error fetching diets:', err);
//         setLoading(false);
//       });
//   }, []);
// }

// const applyFilters = () => {
//     let result = [...persons];

//     // Apply search
//     if (filters.searchTerm) {
//         result = result.filter(person => {
//             const searchValue = person[filters.searchField]?.toString().toLowerCase();
//             return searchValue?.includes(filters.searchTerm.toLowerCase());
//         });
//     }

//     // Apply publisher filter
//     //if (filters.publisher !== 'all') {
//        // result = result.filter(person => person.name === filters.name);
//    // }

//     // Apply sorting
//     result.sort((a, b) => {
//         let valueA = a[filters.sortBy]?.toString().toLowerCase();
//         let valueB = b[filters.sortBy]?.toString().toLowerCase();

//         if (filters.sortBy === 'contact_number') {
//             valueA = new Date(a.);
//             valueB = new Date(b.published_date);
//         }

//         if (valueA < valueB) return filters.sortOrder === 'asc' ? -1 : 1;
//         if (valueA > valueB) return filters.sortOrder === 'asc' ? 1 : -1;
//         return 0;
//     });

//     setFilteredPersons(result);
// };

// useEffect(() => {
//     applyFilters();
// }, [filters]);

// const resetFilters = () => {
//     setFilters({
//         searchTerm: "",
//         searchField: "food_name",
//         sortBy: "food_name",
//         sortOrder: "asc",
//         contact_number:"all"
//     });
// };

// if (loading) {
//     return (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//             <CircularProgress />
//         </Box>
//     );
// }

// return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
//             Search Persons
//         </Typography>

//         {/* Search and Filter Section */}
//         <Card sx={{ mb: 4, p: 2 }}>
//             <CardContent>
//                 <Grid container spacing={2} alignItems="center">
//                     {/* Search Field */}
//                     <Grid item xs={12} md={4}>
//                         <TextField
//                             fullWidth
//                             label="Search"
//                             value={filters.searchTerm}
//                             onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
//                             InputProps={{
//                                 startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
//                             }}
//                         />
//                     </Grid>

//                     {/* Search By Dropdown */}
//                     <Grid item xs={12} md={2}>
//                         <FormControl fullWidth>
//                             <InputLabel>Search By</InputLabel>
//                             <Select
//                                 value={filters.searchField}
//                                 label="Search By"
//                                 onChange={(e) => setFilters({ ...filters, searchField: e.target.value })}
//                             >
//                                 <MenuItem value="name">Name</MenuItem>
//                                 <MenuItem value="age">Age</MenuItem>
//                                 <MenuItem value="weight">Weight</MenuItem>
//                                 <MenuItem value="bmi">BMI</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     {/* Sort By Dropdown */}
//                     <Grid item xs={12} md={2}>
//                         <FormControl fullWidth>
//                             <InputLabel>Sort By</InputLabel>
//                             <Select
//                                 value={filters.sortBy}
//                                 label="Sort By"
//                                 onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
//                             >
//                                 <MenuItem value="name">Name</MenuItem>
//                                 <MenuItem value="age">Age</MenuItem>
//                                 <MenuItem value="contact_number">Contact_number</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     {/* Sort Order */}
//                     <Grid item xs={12} md={2}>
//                         <FormControl fullWidth>
//                             <InputLabel>Order</InputLabel>
//                             <Select
//                                 value={filters.sortOrder}
//                                 label="Order"
//                                 onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
//                             >
//                                 <MenuItem value="asc">Ascending</MenuItem>
//                                 <MenuItem value="desc">Descending</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     {/* Publisher Filter */}
//                     <Grid item xs={12} md={2}>
//                         <FormControl fullWidth>
//                             <InputLabel>Person</InputLabel>
//                             <Select
//                                 value={filters.person}
//                                 label="Person"
//                                 onChange={(e) => setFilters({ ...filters, person: e.target.value })}
//                             >
//                                 <MenuItem value="all">All Publishers</MenuItem>
//                                 {publishers.map((publisher, index) => (
//                                     <MenuItem key={index} value={publisher}>
//                                         {publisher}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     {/* Reset Button */}
//                     <Grid item xs={12}>
//                         <Box display="flex" justifyContent="center">
//                             <Button
//                                 variant="outlined"
//                                 startIcon={<RestartAltIcon />}
//                                 onClick={resetFilters}
//                             >
//                                 Reset Filters
//                             </Button>
//                         </Box>
//                     </Grid>
//                 </Grid>
//             </CardContent>
//         </Card>

//         {/* Results Section */}
//         <Box sx={{ mb: 2 }}>
//             <Typography variant="body1" color="text.secondary">
//                 Found {filteredBooks.length} books
//             </Typography>
//         </Box>

//         {/* Books Grid */}
//         <Grid container spacing={3}>
//             {filteredBooks.map((book) => (
//                 <Grid item xs={12} sm={6} md={4} key={book._id}>
//                     <Card book={book} />
//                 </Grid>
//             ))}
//         </Grid>
//     </Container>
// );
// };

// export default SearchPerson;