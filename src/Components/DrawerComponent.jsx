import * as React from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/joy/Tooltip';
import ButtonGroup from '@mui/joy/ButtonGroup';
import NotificationMessage from './NotificationMessage';

export default function DrawerComponent() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <React.Fragment>

      <Tooltip title="Ajustes" variant="solid">
        <SettingsIcon
          key={'right'}
          fontSize='large'
          onClick={toggleDrawer('right', true)}
        />
      </Tooltip>

      <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
      <Box sx={{background: 'linear-gradient(to bottom, #EEFFFE, white)', height: '100%'}}>


        <Box sx={{
          paddingTop: '20px',
          paddingLeft: '20px'
        }}>
          <strong>Código del proyecto</strong>
        </Box>
        <Box sx={{
          padding: '20px',
          border: 'solid 2px black',
          borderRadius: '10px',
          margin: '20px',
          marginTop: '10px',
          backgroundColor: 'white'
        }}>
          Un código bien mierdoso
        </Box>
        <ButtonGroup
          variant="soft"
          aria-label="outlined primary button group"
          buttonFlex="0 1 200px"
          sx={{ width: '100%', justifyContent: 'center' }}
        >
          <NotificationMessage text={'Copiar código'} />
          <NotificationMessage text={'Copiar link'} />
        </ButtonGroup>

        
      </Box>


      </Drawer>
    </React.Fragment>
  );
}