import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';

const QRCodePage = () => {
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = 'https://diettracker-1zc0.onrender.com/show-diet/';

  useEffect(() => {
    axios.get('https://diettracker-1zc0.onrender.com/api/tracks')
      .then((res) => {
        setPerson(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching persons:', err);
        setLoading(false);
      });
  }, []);

  const downloadQR = (personId, personName) => {
    const canvas = document.createElement('canvas');
    const svg = document.getElementById(`qr-${personId}`);
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    const img = new Image();
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const a = document.createElement('a');
      a.download = `DietTracker_QR_${personName.replace(/\s+/g, '_')}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
        Welcome to the Library
      </Typography>
      <Typography variant="body1" gutterBottom align="center" sx={{ mb: 4 }}>
        Scan a QR code to learn more about a diet.
      </Typography>
  
      <Grid container spacing={3}>
        {person.map((person) => (
          <Grid item xs={12} sm={6} md={4} key={person._id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                borderRadius: 2,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for better aesthetics
                '&:hover': {
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Slightly stronger shadow on hover
                },
              }}
              elevation={3} // Material-UI elevation prop for raised appearance
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <QRCodeSVG
                  id={`qr-${person._id}`}
                  value={`${baseUrl}${person._id}`}
                  size={200}
                  level="H"
                  includeMargin
                />
                <Typography
                  variant="h6"
                  component="div"
                  align="center"
                  sx={{ mt: 2, mb: 1 }}
                >
                  {person.name}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => downloadQR(person._id, person.name)}
                  size="small"
                  sx={{
                    mt: 2,
                    borderRadius: 2,
                    textTransform: 'capitalize',
                  }}
                >
                  Download QR
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default QRCodePage;