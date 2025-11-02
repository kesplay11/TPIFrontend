import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
    import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import '@fontsource/roboto/700.css';
import './App.css'
import Login from './Login/LoginView';

function App() {
  return(
    <>

        {/* <h1 class="text-3xl font-bold underline">
    Importe las dependencias
    socet.io  
    axios
    tailwind.css 
    mui/material  
    roboto fonts que la usa muimaterial
    el siguiente coommit sera para declarar la estructura del fronten(carpetas,servicios,etc)
  </h1> */}

  <Login></Login>

</>
  )
}

export default App
