import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Componentes 
import Home from './Components/Home.jsx';
import Proyects from './Components/Proyects.jsx';
import ErrorPage from './error-page.jsx';
import Diagrama from './Components/Diagrama.jsx';

// El enrutador 
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


// Estilos 
import './main.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Proyects/>
      },      
    ]
  },
  {
    path: "/diagrama/:id",
    element: <Diagrama/>
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
