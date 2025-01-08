import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, Box, CircularProgress } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableViewIcon from '@mui/icons-material/TableView';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import axios from 'axios';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const URL = process.env.REACT_APP_URL;

const ExportPage = () => {
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('${URL}/api/diets')
      .then(res => {
        setPerson(res.data); // Changed from setPersons to setPerson
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching persons:', err);
        setLoading(false);
      });
  }, []);

  const Date = (date) => {
    if (!date) return 'N/A';
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? 'N/A' : parsedDate.toLocaleDateString();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title and date
    doc.setFontSize(16);
    doc.text('Persons List', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

    // Create table data
    const tableColumn = ["name", "age" , "weight", "bmi", "contact_number" ];
    const tableRows = person.map(person => [
      person.name,
      person.age,
      person.weight,
      person.bmi,
      person.contact_number,
      
      // new Date(person.date).toLocaleDateString()
    ]);

    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 }
    });

    doc.save('person-list.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(person.map(person => ({ // Changed from persons to person
      name: person.name, 
      age: person.age,// Corrected to use the correct object property
      weight: person.weight,
      bmi: person.bmi,
      contact_number: person.contact_number,
      
      // 'Published Date': new Date(t.date).toLocaleDateString(),
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Persons');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(data, 'person-list.xlsx');
  };

  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(person.map(person => ({ 
      name: person.name,
      age: person.age, // Corrected to use the correct object property
      weight: person.weight,
      bmi: person.bmi,
      contact_number: person.contact_number,
      

    })));

    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const data = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(data, 'person-list.csv');
  };

  const exportToText = () => {
    let content = 'PERSONS LIST\n\n';
    content += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    
    person.forEach((person, index) => { // Changed from persons to person
      content += `${index + 1}. PERSON DETAILS\n`;
      content += `name: ${person.name}\n`; // Changed from person.name to t.name
      content += `age: ${person.age}\n`;
      content += `weight: ${person.weight}\n`;
      content += `bmi: ${person.bmi}\n`;
      content += `contact_number: ${person.contact_number}\n`; // Changed from person.weight to t.weight
      content += '\n----------------------------\n\n';
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'person-list.txt');
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Manage Exports
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4 }} align="center" color="text.secondary">
          Choose a format to export your person collection seamlessly
        </Typography>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
          gap: 3,
          mt: 4 
        }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<PictureAsPdfIcon />}
            onClick={exportToPDF}
            sx={{ p: 2, backgroundColor: '#d32f2f' }}
          >
            Export PDF
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<TableViewIcon />}
            onClick={exportToCSV}
            sx={{ p: 2, backgroundColor: '#1976d2' }}
          >
            Export CSV
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<DownloadIcon />}
            onClick={exportToExcel}
            sx={{ p: 2, backgroundColor: '#388e3c' }}
          >
            Export Excel
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<DescriptionIcon />}
            onClick={exportToText}
            sx={{ p: 2, backgroundColor: '#f57c00' }}
          >
            Export Text
          </Button> 
        </Box>

        <Typography variant="body2" sx={{ mt: 4 }} align="center" color="text.secondary">
          Total Persons Available for Export: {person.length}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ExportPage;