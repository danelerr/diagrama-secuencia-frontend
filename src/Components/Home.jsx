import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { Outlet } from 'react-router-dom';
import CrearNuevoProyectoModal from './modals/CrearNuevoProyectoModal.jsx';
import UnirseConCodigoModal from './modals/UnirseConCodigoModal.jsx';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <Box
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
          width: '22rem',
          backgroundColor: '#EEFFFE',
          borderRight: 'solid 1px black',
        }}
      >
        <Typography
          level="h4"
          sx={{
            display: 'flex',
            alignItems: 'center',
            margin: 0,
            padding: '1rem 2rem',
            borderTop: '1px solid #e3e3e3',
            fontWeight: 'bold',
            letterSpacing: 0,
          }}
        >
          <img
            src="/logo.svg"
            alt="Logo"
            style={{ marginRight: '0.5rem', position: 'relative', top: '1px' }}
          />
          <Link to='/'> PARCIAL 1 Ingenieria de Software 1 </Link>
        </Typography>
  
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '2rem',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            paddingLeft: '2rem',
            paddingRight: '2rem',
          }}
        >
          <CrearNuevoProyectoModal/>
          <UnirseConCodigoModal/>
        </Box>
  
        <Box
          sx={{
            overflow: 'auto',
            flex: 1,
            padding: '1rem 2rem',
          }}
        >

        </Box>
      </Box>

      <Box sx={{
        flex: 1,
        width: '100%',
      }}>
        <Outlet />
      </Box>
    </Box>
  );
  
};


export default Home;
