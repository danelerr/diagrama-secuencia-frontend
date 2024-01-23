import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

import Textarea from '@mui/joy/Textarea';
import { useState, useEffect } from 'react';
import MenuExportar from './MenuExportar.jsx';
import Mermaid from './Mermaid.jsx';
import { useLocation } from 'react-router-dom';
import mermaid from "mermaid";
import { useNavigate } from 'react-router-dom';
import DrawerComponent from './DrawerComponent.jsx';


function Diagrama() {

    const [nombre, setNombre] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState('');
    const [proyData, setProydata] = useState({});
    const [svgText, setSvgText] = useState(null);


    const location = useLocation();

    const navigate = useNavigate();


    useEffect(() => {
        const obtenerDiagrama = async () => {
            const x = location.pathname;
            const loc = x.substring(x.lastIndexOf('/') + 1, x.length);
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}obtener-proyecto/${loc}`);
            const data = await res.json();
            setNombre(data[0].nombre);
            const dt = data[0].diagrama;
            if (dt) setText(dt)
            else setText('');
            setProydata(data[0]);
        }
        obtenerDiagrama();
    }, [location.pathname]);


    //Para el cambio de nombre en el proyecto (diagrama)
    const handleCambiarTitulo = async (e) => {
        if (e.target.value != '') { 
            setNombre(e.target.value);
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}actualizar-nombre-descripcion-proyecto/${proyData.id}`, {
                method: 'PUT',
                body: JSON.stringify({nombre: nombre, descripcion: proyData.descripcion}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            console.log(data);
            console.log('actualizado');
        }
    }

    // GUARDA EL TEXTO DEL DIAGRAMA EN LA BASE DE DATOS
    const handleCambiarText = async (e) => {
            const nt = e.target.value;
            setText(nt);

            if (await mermaid.parse('sequenceDiagram \n' + nt)) {
                const obj = {diagrama: nt};
                console.log(obj);
                console.log(proyData.id);
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}actualizar-diagrama/${proyData.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(obj),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await res.json();
                console.log(data);
                console.log('actualizado diagrama');
            }
    }

    return (
        <>
        <Box
            onClick={(e) => {
                e.preventDefault();
                if (!editMode) return;
                let x = e.target.className;
                console.log();
                if (typeof (x) == 'string' && x.indexOf('JoyTextarea-textarea') == -1) {
                    setEditMode(false);
                }
            }}
            sx={{
                display: 'flex',
                height: '100vh',
            }}
        >
            {/* sidebar */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '25vw',
                    backgroundColor: '#EEFFFE',
                    borderRight: 'solid 1px black',
                }}
            >
                {/* Box de los botones */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        gap: '2rem',
                        paddingTop: '1rem',
                        paddingBottom: '1rem',
                        paddingLeft: '2rem',
                        paddingRight: '2rem',
                    }}
                >
                    <Button
                        startIcon={<ArrowBackIcon />}
                        color="success"
                        variant="text"
                        sx={{ color: 'black' }}
                        onClick={() =>  navigate(`/`)}
                    >
                        Volver
                    </Button>

                    <MenuExportar svgText={svgText} text={text} />
                </Box>

                {/* BTexto para escribir */}
                <Box
                    sx={{
                        overflow: 'auto',
                        flex: 1,
                        paddingLeft: '10px',
                        paddingRight: '10px'
                    }}
                >
                    <Textarea
                        placeholder="Escribe aqui el diagrama"
                        onChange={handleCambiarText}
                        minRows={6}
                        maxRows={30}
                        name='nombre'
                        defaultValue={text}
                        autoFocus
                        required
                        sx={{
                            backgroundColor: '#000',
                            color: 'white',
                            width: '100%',
                            fontFamily: 'monospace'

                        }}
                        endDecorator={
                            <Typography level="body-xs" sx={{ ml: 'auto', color: '#EEFFFE' }}>
                              {text.length} Caracteres
                            </Typography>
                          }
                    />

                </Box>
            </Box>

            {/* el otro lado */}
            <Box sx={{
                flex: 1,
                width: '100%',
            }}>
                <Box sx={{
                    backgroundColor: '#232323',
                    width: '75vw',
                    height: '60px',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: '20px',
                    paddingRight: '20px'
                }}

                >
                    {
                        editMode
                            ?
                            <Textarea
                                minRows={1}
                                name='nombre'
                                autoFocus
                                required
                                onChange={handleCambiarTitulo}
                                defaultValue={nombre}
                                sx={{
                                    backgroundColor: '#232323',
                                    color: 'white',
                                    width: '40vw',

                                }}
                            />
                            :
                            <Typography level='h3' color='white' onDoubleClick={() => setEditMode(true)} >
                                {nombre}
                            </Typography>
                    }

                    <DrawerComponent/>
                </Box>


                <Mermaid chart={'sequenceDiagram \n' + text} proy={proyData} setSvgText={setSvgText} svgText={svgText} />
            </Box>
        </Box>
        </>
    );
}

export default Diagrama;