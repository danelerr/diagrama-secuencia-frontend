import {useState, Fragment} from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import IconButton from '@mui/joy/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import { Transition } from 'react-transition-group';
import EliminarProyectoModal from './EliminarProyectoModal.jsx'
import { useNavigate } from 'react-router-dom';
import CambiarNombreProyectoModal from './CambiarNombreProyectoModal.jsx';
import ObtenerDetallesProyecto from './ObtenerDetallesProyecto.jsx';
import CambiarImagenProyectoModal from './CambiarImagenProyectoModal.jsx';

function MenuProyectosModal({proy}) {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <Fragment>
            <IconButton
                style={{ backgroundColor: 'black', color: 'white', borderRadius: '50%' }}
                onClick={() => {
                    setOpen(true)
                }}
            >
                <MoreHorizIcon />
            </IconButton>
            <Transition in={open} timeout={400}>
                {(state) => (
                    <Modal
                        keepMounted
                        open={!['exited', 'exiting'].includes(state)}
                        onClose={() => {
                            setOpen(false)
                        }}
                        slotProps={{
                            backdrop: {
                                sx: {
                                    opacity: 0,
                                    backdropFilter: 'none',
                                    transition: `opacity 400ms, backdrop-filter 400ms`,
                                    ...{
                                        entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                                        entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                                    }[state],
                                },
                            },
                        }}
                        sx={{
                            visibility: state === 'exited' ? 'hidden' : 'visible',
                        }}
                    >
                        <ModalDialog
                            layout="center"
                            sx={{
                                opacity: 0,
                                transition: `opacity 300ms`,
                                ...{
                                  entering: { opacity: 1 },
                                  entered: { opacity: 1 },
                                }[state],
                              }}
                        >
                            {/* <DialogTitle>Project 1</DialogTitle>
                            <DialogContent>Esta es la descripcion de los proyectos.</DialogContent> */}
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    setOpen(false);
                                }}
                            >
                                <Stack spacing={2} >

                                    <Button style={{ backgroundColor: 'white', color: 'black', width: '100%' }} type="submit"
                                        onClick={() => navigate(`/guiones/${proy.id}`)}
                                    >
                                        Abrir
                                    </Button>

                                    <CambiarNombreProyectoModal idProy={proy.id} nombreProy={proy.nombre} descProy={proy.descripcion} />

                                    {/* <Button style={{ backgroundColor: 'white', color: 'black', width: '100%' }} type="submit">Cambiar Miniatura </Button> */}
                                    

                                    <CambiarImagenProyectoModal idProy={proy.id} />


                                    <ObtenerDetallesProyecto idProy={proy.id} />


                                    {/* <Button style={{ backgroundColor: 'white', color: 'black', width: '100%' }} type="submit">Detalles del proyecto </Button> */}

                                    <EliminarProyectoModal idProy={proy.id}  />
                                </Stack>
                            </form>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>


        </Fragment>
    );
}


export default MenuProyectosModal;


