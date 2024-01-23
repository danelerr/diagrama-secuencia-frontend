import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Tooltip from '@mui/joy/Tooltip';

export default function EliminarGuionModal({ idGuion }) {


    const [open, setOpen] = React.useState(false);

    const eliminarGuion = async (e) => {

        e.preventDefault();

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}eliminar-guion/${idGuion}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        console.log(data);
        console.log('eliminado');
        setOpen(false);
        window.location.reload();
    }


    return (

        <React.Fragment>
            <Tooltip title="Eliminar el guión" variant="solid">
                <DeleteForever type="submit"               
                 onClick={() => {
                    setOpen(true)
                }}/>
            </Tooltip>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRoundedIcon />
                        ¿Realmente quieres borrar este guión?
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Recuerda que si borras este guión no podras recuperarlo, ni sus elementos que lo componen
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={eliminarGuion}>
                            Confirmar
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}