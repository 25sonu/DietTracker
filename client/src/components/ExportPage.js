// src/components/ExportPage.js
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

const ExportPage = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://5000-25sonu-diettracker-t9bp4y6b1y4.ws-us117.gitpod.io/api/diets')
      .then(res => {
        setPersons(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching persons:', err);
        setLoading(false);
      });
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title and date
    doc.setFontSize(16);
    doc.text('Persons List', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

    // Create table data
    const tableColumn = ["name", "age", "weight", "BMI", "contact_number"];
    const tableRows = persons.map(person => [
     person.name,
     person.age,
     person.weight,
     person.BMI,
    
      new Date(person.contact_number).toLocaleDateString()
    ]);

    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 }
    });

    doc.save('persons-list.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(persons.map(person => ({
      Name: person.name,
      Age:person.age,
      Weight:person.weight,
      BMI: person.bmi,
      'Contact_number': new Date(person.contact_number).toLocaleDateString(),
      
    })));

    const workperson = XLSX.utils.person_new();
    XLSX.utils.person_append_sheet(workperson, worksheet, "Persons");
    const excelBuffer = XLSX.write(workperson, { personType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'persons-list.xlsx');
  };

  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(persons.map(person => ({
      Name:person.name,
      Age:person.age,
      Weight:person.weight,
      BMI:person.bmi,
      'Contact_number': new Date(person.contact_number).toLocaleDateString(),
      
    })));

    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const data = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(data, 'persons-list.csv');
  };

  const exportToText = () => {
    let content = 'PERSONS LIST\n\n';
    content += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    
    persons.forEach((person, index) => {
      content += `${index + 1}. PERSON DETAILS\n`;
      content += `Name: ${person.name}\n`;
      content += `Age: ${person.age}\n`;
      content += `Weight: ${person.weight}\n`;
      content += `BMI: ${person.bmi}\n`;
      content += `Contact_number: ${new Date(person.contact_number).toLocaleDateString()}\n`;
      content += `Description: ${person.description || 'N/A'}\n`;
      content += '\n----------------------------\n\n';
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'persons-list.txt');
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
          Export Persons
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4 }} align="center" color="text.secondary">
          Export your person collection in different formats
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
            sx={{ p: 2 }}
          >
            Export as PDF
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<TableViewIcon />}
            onClick={exportToCSV}
            sx={{ p: 2 }}
          >
            Export as CSV
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<DownloadIcon />}
            onClick={exportToExcel}
            sx={{ p: 2 }}
          >
            Export as Excel
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<DescriptionIcon />}
            onClick={exportToText}
            sx={{ p: 2 }}
          >
            Export as Text
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 4 }} align="center" color="text.secondary">
          Total Persons: {persons.length}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ExportPage;