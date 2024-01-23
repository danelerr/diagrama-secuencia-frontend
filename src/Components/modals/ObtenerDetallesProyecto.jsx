import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';

export default function ObtenerDetallesProyecto() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button 
      color="neutral" 
      style={{ backgroundColor: 'white', color: 'black', width: '100%' }} 
      type="submit"
      onClick={() => setOpen(true)}>
        Detalles del proyecto
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
            level="h2"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Detalles
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>

            <Box sx={{ display: 'flex', gap: '50px' }}>
                <Box sx={{ 
                        border: '2px solid black', 
                        width: '150px',   
                        display: 'flex', 
                        justifyContent: 'center',
                        height: '150px',
                    }}>
                    <img width='140px' height='140px'  src="default-proyect-icon.svg" alt="npombre" />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    
                    <Box sx={{ display: 'flex', gap: '10px', }}>
                        <Typography  sx={{  overflowWrap: 'break-word'}} id="modal-desc" textColor="text.tertiary">
                             Nombre:
                        </Typography>
                        <Typography   sx={{ wordWrap: 'break-word', wordBreak: 'break-all' }}
                        
                        id="modal-desc" 
                        textColor="black">
                            <strong>Nombre del proyecto</strong>
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: '10px'}}>

                        <Typography   Typography id="modal-desc" textColor="text.tertiary">
                        Descripcion:
                        </Typography>

                        <Typography   Typography id="modal-desc" textColor="black">
                           <strong>Esta es la descripcion</strong>                     
                        </Typography>
                    </Box>
                </Box>

            </Box>

            <Box  sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Typography id="modal-desc" textColor="text.tertiary">
                    Creado en:  <strong>10/10/2023 12:34</strong>
                </Typography>
                <Typography id="modal-desc" textColor="text.tertiary">
                    Última Modifcación en: <strong>10/10/2023 12:33</strong>
                </Typography>
            </Box>
          
          
          </Box>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}