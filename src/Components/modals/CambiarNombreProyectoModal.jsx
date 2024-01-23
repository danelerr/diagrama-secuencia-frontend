import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';

export default function CambiarNombreProyectoModal({idProy, nombreProy, descProy}) {

    const [open, setOpen] = React.useState(false);

    const [nombre, setNombre] = React.useState({});

    const handleChange = (e) => {    
        setNombre({...nombre, [e.target.name]: e.target.value});
        console.log(nombre);

    }
    const CambiarNombreProyecto = async (e) => {

        e.preventDefault();
  
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}actualizar-nombre-descripcion-proyecto/${idProy}`, {
            method: 'PUT',
            body: JSON.stringify(nombre),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        console.log(data);
        setOpen(false);
        window.location.reload();
    }
  

    return (
        <React.Fragment>

            <Button
                type='submit'
                color='primary'
                style={{ backgroundColor: 'white', color: 'black', width: '100%' }}
                onClick={() => {
                    setOpen(true);
                }}
            >
                Cambiar nombre y/o descripción
            </Button>


            <Modal open={open} 
                onClose={() => {setOpen(false)}}>
                <ModalDialog>
                    <DialogTitle> Cambiar el nombre al diagrama  </DialogTitle>
                    <DialogContent> Nombre actual: {nombreProy} </DialogContent>
                    <DialogContent> Descripción actual: {descProy} </DialogContent>
                    <form
                        onSubmit={CambiarNombreProyecto}
                    >   
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Nuevo Nombre </FormLabel>
                                <Input name='nombre'  autoFocus required onChange={handleChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Nueva Descripción </FormLabel>
                                <Textarea minRows={2} name='descripcion'  autoFocus required onChange={handleChange} />
                            </FormControl>
                            <Button 
                                type="submit"
                             color='primary'
                             style={{ backgroundColor: 'black', color: 'white', width: '100%' }}
                            >
                                Actualizar datos
                            </Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}

