import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import FormControl from '@mui/joy/FormControl';
// import FormLabel from '@mui/joy/FormLabel';
// import Input from '@mui/joy/Input';
import { FormLabel, Input, styled } from '@mui/joy';
import Box from '@mui/joy/Box';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;


export default function CambiarImagenProyectoModal({idProy}) {


    const [open, setOpen] = React.useState(false);

    const [imagen, setImagen] = React.useState();

    const [drop, setDrop] = React.useState(false);

    const modificarImagen = async (e) => {
        e.preventDefault();

        if (!imagen) {
            return;
        }

        console.log(imagen);

        //aqui la logica para pasarle al backend la porqueria esa 
        const formData = new FormData();

        formData.append('imagen', imagen);

        
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}actualizar-imagen-proyecto/${idProy}`, {
            method: 'PUT',
            body: formData,
        });
        const data = await res.json();
        console.log(data);
        console.log('actualizado');
        setOpen(false);
        // window.location.reload();
    }

    const handleChange = (e, filedrop = undefined) => {
        e.preventDefault();

        setImagen(null);

        let selectedImage;

        if (!filedrop) {
            selectedImage = e.target.files && e.target.files[0];
        } else {
            selectedImage = filedrop;
        }

        
        const fileExtension = selectedImage.name.substring(selectedImage.name.lastIndexOf('.'));

        const fileExtensions = ['.jpg', 'jpeg', '.png'];

        if (selectedImage && fileExtensions.indexOf(fileExtension) != -1) {
            setImagen(selectedImage);
        } else {
            alert('hubo un error al cargar tu imágen');
        }
        console.log(selectedImage);
    }

    
    return (
        <React.Fragment>
            {/* Boton abrir el modal */}
            <Button
                color="neutral"
                style={{ backgroundColor: 'white', color: 'black', width: '100%' }}
                type="submit"
                onClick={() => { 
                    setOpen(true);
                    setImagen(null);
                }}>
                Cambiar Miniatura
            </Button>


            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 700,
                        minWidth: 400,
                        borderRadius: 'md',
                        overflowWrap: 'break-word',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                        component="h3"
                        id="modal-title"
                        level="h3"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        Cambiar Miniatura
                    </Typography>

                    {/* Logica de  */}
                    <form action="" onSubmit={modificarImagen}>

                        {/* Controles de boton */}
                        <FormControl  
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: '10px', 
                                marginBottom: '40px',
                                alignItems: 'center'
                            }}
                        >      
                            {/* Para mostrar cargar otra imagen cuando no hay */}
                            {imagen && (
                                <>
                                <FormLabel> Click aqui para seleccionar otra imagen o arrastra otra</FormLabel>
                                <Input 
                                    sx={{
                                        display: 'none'
                                    }}
                                    type='file'  
                                    onChange={handleChange} 
                                />
                                </>
                            )}

                            {!imagen && (
                                <Box
                                    sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column',  
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '300px',
                                        height: '150px',
                                        marginTop: '20px',
                                        border: 'dashed 2px #5786d9',
                                        borderRadius: '20px',
                                        backgroundColor: drop ? '#cbdaf2' : 'inherit'
                                    }}
                                    onDragEnter={(e) => { 
                                        e.preventDefault();
                                        setDrop(true)
                                    }}
                                    onDragOver={(e) => { 
                                        e.preventDefault();
                                        setDrop(true)}
                                    }
                                    onDragLeave={(e) => {
                                        e.preventDefault();
                                        setDrop(false)
                                    }}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setDrop(false);
                                        const files = Array.from(e.dataTransfer.files);
                                        handleChange(e, files[0]);
                                    }}
                                >
                                    <span>Arrastra tu archivo aqui </span>
                                    <span> o </span>
                                    <Button
                                        component="label"
                                        variant='soft'
                                        tabIndex={-1}
                                        role={undefined}
                                    > 
                                        Selecciona una Imágen
                                        <VisuallyHiddenInput type="file" onChange={handleChange} />
                                    </Button>
                                </Box>
                            )}
                        </FormControl>
                        
                        {/* Para controlar el drag and drop */}
                        <FormControl 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                backgroundColor: drop ? '#cbdaf2' : 'inherit'
                                }}
                            onDragEnter={(e) => { 
                                e.preventDefault();
                                setDrop(true)
                            }}
                            onDragOver={(e) => { 
                                e.preventDefault();
                                setDrop(true)}
                            }
                            onDragLeave={(e) => {
                                e.preventDefault();
                                setDrop(false)
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                setDrop(false);
                                const files = Array.from(e.dataTransfer.files);
                                handleChange(e, files[0]);
                            }}
                            >
                            {imagen && 
                            (<img 
                                src={URL.createObjectURL(imagen)} 
                                alt='wtf' 
                                style={{ maxWidth: '100%', maxHeight: '300px', marginBottom: '20px' }}
                            >
                            </img>)}
                        </FormControl>

                        {/* Boton actualizar imagen (submit) */}
                        <Button 
                            type="submit"
                             color='primary'
                             style={{ backgroundColor: 'black', color: 'white', width: '100%' }}
                            >
                            Actualizar Imágen
                        </Button>
                    </form>
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}