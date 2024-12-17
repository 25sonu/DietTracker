// src/theme/dietTrackerTheme.js
import { createTheme } from '@mui/material/styles';

const dietTrackerColors = {
  base: '#191724',       // Background color
  surface: '#1f1d2e',    // Card or paper background
  overlay: '#26233a',    // Overlay background for modals or pop-ups
  muted: '#6e6a86',      // Muted text color for less emphasized content
  subtle: '#908caa',     // Secondary text color
  text: '#e0def4',       // Main text color (light, for readability)
  love: '#eb6f92',       // Used for critical error/warnings (e.g., unhealthy behavior)
  gold: '#f6c177',       // Used for progress warnings (e.g., low water intake, high sugar)
  rose: '#ebbcba',       // A soft pink for primary elements (e.g., meal sections)
  pine: '#31748f',       // A greenish blue for secondary actions (e.g., success states, diet success)
  foam: '#9ccfd8',       // Soft blue for informative states (e.g., tips, healthy recipes)
  iris: '#c4a7e7',       // Light purple for highlights (e.g., calorie targets)
  highlightLow: '#21202e',
  highlightMed: '#403d52',
  highlightHigh: '#524f67',
};

const dietTrackerTheme = createTheme({
  palette: {
    mode: 'dark', // Keep dark mode for reduced eye strain
    background: {
      default: dietTrackerColors.base, // Default background color
      paper: dietTrackerColors.surface, // Paper elements like cards
    },
    primary: {
      main: dietTrackerColors.rose, // Soft pink for primary action buttons (e.g., Add Meal)
    },
    secondary: {
      main: dietTrackerColors.pine, // Greenish blue for secondary actions (e.g., View Progress)
    },
    error: {
      main: dietTrackerColors.love, // Red for error (e.g., unhealthy snack)
    },
    warning: {
      main: dietTrackerColors.gold, // Yellow for warnings (e.g., not enough water)
    },
    info: {
      main: dietTrackerColors.foam, // Light blue for informative content (e.g., tips, facts)
    },
    success: {
      main: dietTrackerColors.pine, // Green for success messages (e.g., goal achieved)
    },
    text: {
      primary: dietTrackerColors.text, // Main text color (light text)
      secondary: dietTrackerColors.subtle, // Secondary text color (e.g., meal details)
    },
  },
  typography: {
    fontFamily: '"Fira Sans", "Roboto", "Helvetica", "Arial", sans-serif', // Clean, readable font
    h1: {
      fontFamily: '"Space Mono", monospace', // Monospace for headers like "Today's Intake"
    },
    h2: {
      fontFamily: '"Space Mono", monospace',
    },
    h3: {
      fontFamily: '"Space Mono", monospace',
    },
    h4: {
      fontFamily: '"Space Mono", monospace',
    },
    h5: {
      fontFamily: '"Space Mono", monospace',
    },
    h6: {
      fontFamily: '"Space Mono", monospace',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: dietTrackerColors.surface, // App bar in dark surface color
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // No uppercase conversion for button text
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;700&family=Space+Mono:wght@400;700&display=swap');
      `,
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: dietTrackerColors.text, // Apply text color to all Typography elements
        },
      },
    },
    // Optionally add more customizations for other components like forms, sliders, etc.
  },
});

export default dietTrackerTheme;
