import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import AppTest from './appTest.jsx'
import { ThemeProvider } from '@emotion/react';
import theme from "./theme";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
          <App />
          {/* <AppTest></AppTest> */}
    </ThemeProvider>
  </StrictMode>,
)
