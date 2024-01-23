import * as React from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';

export default function NotificationMessage({text}) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Button color="primary" onClick={() => setOpen(true)}>
        {text}
      </Button>
      <Snackbar
        variant="soft"
        color="success"
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
        endDecorator={
          <Button
            onClick={() => setOpen(false)}
            size="sm"
            variant="soft"
            color="success"
          >
            Cerrar
          </Button>
        }
      >
        Hecho
      </Snackbar>
    </React.Fragment>
  );
}