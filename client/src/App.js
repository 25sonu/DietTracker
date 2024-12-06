// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
//import rosePineTheme from './theme/rosepine';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import CreateBook from './components/CreateBook';
// import ShowBookList from './components/ShowBookList';
// import ShowBookDetails from './components/ShowBookDetails';
// import UpdateBookInfo from './components/UpdateBookInfo';
// import HomePage from './components/HomePage';
// import NotesPage from './components/NotesPage'; // Import NotesPage component

const App = () => {
  return (
     <Router>
       <Box display="flex" flexDirection="column" minHeight="100vh">
       <Navbar />
        <Box component="main" flexGrow={1} py={3}>
      </Box>
      < Footer/>
      </Box>
     </Router>
  );
};

export default App;