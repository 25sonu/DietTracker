// src/components/Searchpersons.js
import React, { useState, useEffect } from 'react';
import {
    Container,
    TextField,
    Typography,
    Box,
    Card,
    CardContent,
    Grid,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PersonCard from './PersonCard';
import axios from 'axios';

const SearchPersons = () => {
    const [persons, setPersons] = useState([]);
    const [filteredPersons, setFilteredPersons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [contact_number, setContact_number] = useState([]);

    const [filters, setFilters] = useState({
        searchTerm: "",
        searchField: "food_name",
        sortBy: "food_name",
        sortOrder: "asc",
        contact_number:"all"
    });
    
    useEffect(()=>{
        axios.get('/api/diets')
        .then(res => {
            setPersons(res.data);
            setFilteredPersons(res.data);
            // Extract unique contact_number
            const uniqueContact_number = [...new Set(res.data.map(person => person.contact_number))];
            setContact_number(uniqueContact_number);
            setLoading(false);
    })
    .catch((err) => {
        console.error('Error fetching tracks:', err);
        setLoading(false);
      });
  }, []);
}