import { useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';

//crea proyectos y guiones
export default function CrearNuevoProyectoModal() {

    const [open, setOpen] = useState(false);

    const [proyecto, setProyecto] = useState({
        nombre: '',
        descripcion: ''
    });

    const handleChange = (e) => {
        setProyecto({...proyecto, [e.target.name]: e.target.value});
    }

    const handleCreate = async (event) => {

        event.preventDefault();


        await fetch(`${import.meta.env.VITE_BACKEND_URL}crear-proyecto`, {
            method: 'POST',
            body: JSON.stringify(proyecto),
            headers: {
                    "Content-Type": "application/json"
            }
        });
            
        console.log('submit');
        setOpen(false);
        window.location.reload();
        
    }

    return (
        <>
            <Button
                startDecorator={<Add />}
                color='primary'
                style={{ backgroundColor: 'black', color: 'white', width: '100%' }}
                onClick={() => {
                    setProyecto({
                        nombre: '',
                        descripcion: ''
                    });
                    setOpen(true);
                }}
            >
                Nuevo Diagrama

            </Button>


            <Modal open={open} 
                onClose={() => {setOpen(false)}}>
                <ModalDialog>
                    <DialogTitle> 
                        Crear un nuevo diagrama
                    </DialogTitle>
                    <DialogContent> 
                        Completa los campos en blanco para crear el diagrama
                    </DialogContent>

                    <form
                        onSubmit={handleCreate}
                    >   
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Nombre </FormLabel>
                                <Input name='nombre'  autoFocus required onChange={handleChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Descripción</FormLabel>
                                <Input  name='descripcion' onChange={handleChange} />
                            </FormControl>
                            <Button 
                                type="submit"
                             color='primary'
                             style={{ backgroundColor: 'black', color: 'white', width: '100%' }}
                            >
                                Crear diagrama
                            </Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </>
    );
}