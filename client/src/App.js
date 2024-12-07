// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
//import rosePineTheme from './theme/rosepine';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
 import CreatePerson from './components/CreatePerson';
// import ShowPersonList from './components/ShowPersonList';
// import ShowPersonDetails from './components/ShowPersonDetails';
// import UpdatePersonInfo from './components/UpdatePersonInfo';
 import HomePage from './components/HomePage';

// import NotesPage from './components/NotesPage'; // Import NotesPage component

const App = () => {
  return (
     //<ThemeProvider theme={rosePineTheme}>
       //<CssBaseline />
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Navbar />
          <Box component="main" flexGrow={1} py={3}>
            <Routes>
              <Route exact path='/' element={<HomePage />} />
             {/* <Route path='/person-list' element={<ShowPersonList />} /> */}
              <Route path='/create-person' element={<CreatePerson />} />
              {/* <Route path='/edit-person/:id' element={<UpdatePersonInfo />} />
              <Route path='/show-person/:id' element={<ShowPersonDetails />} />
              <Route path='/notes/*' element={<NotesPage />} />  */}
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
       //</ThemeProvider>
  );
};

export default App;