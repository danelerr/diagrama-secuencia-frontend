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
import GroupIcon from '@mui/icons-material/Group';
//crea proyectos y guiones
export default function CrearNuevoProyectoModal() {

    const [open, setOpen] = useState(false);

    const [codigo, setCodigo] = useState('');

    const handleChange = (e) => {
        setCodigo(e.target.value);
    }

    const hanldleJoin = async (event) => {

        event.preventDefault();

        alert(codigo);
        console.log('submit');
        setOpen(false);

    }

    return (
        <>
            <Button
                startDecorator={<GroupIcon />}
                color='primary'
                style={{ backgroundColor: 'white', color: 'black', width: '100%', border: '2px black solid' }}
                onClick={() => {
                    setCodigo({
                        nombre: '',
                        descripcion: ''
                    });
                    setOpen(true);
                }}
            >
                Unirse con código o link
            </Button>


            <Modal open={open}
                onClose={() => { setOpen(false) }}>
                <ModalDialog>
                    <DialogTitle>
                        Ingresa el código del proyecto o link
                    </DialogTitle>
                    <DialogContent>

                    </DialogContent>

                    <form
                        onSubmit={hanldleJoin}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Código o link </FormLabel>
                                <Input name='nombre' autoFocus required onChange={handleChange} />
                            </FormControl>
                            <Button
                                type="submit"
                                color='primary'
                                style={{ backgroundColor: 'black', color: 'white', width: '100%' }}
                            >
                                Unirse
                            </Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </>
    );
}