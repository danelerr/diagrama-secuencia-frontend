import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const [imagen, setImagen] = useState('');
  useEffect(() => {
    const rutaImagen = 'logo.svg';
  
    const x = async () => {
      const archivoSVG = await fetch(rutaImagen).then(response => response.blob());
      console.log(archivoSVG);
      const fechaActual = new Date().toISOString();
      console.log(fechaActual);
      const urlBlob = URL.createObjectURL(archivoSVG);
      console.log(urlBlob);
      setImagen(urlBlob);
    };
    x();
  }, []);

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }}>
      <img src={imagen} alt="sw" />
      <h1>¡WTF!</h1>
      <p>Algo inesperado ha pasado chaval.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Box>
  );
}