import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import { Popper } from '@mui/base/Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { styled } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import MenuList from '@mui/joy/MenuList';
import Box from '@mui/joy/Box';
import { exportToPNG, exportToSVG, exportToTxt, exportToJSON, exportToXML } from "./Functions.jsx";

const Popup = styled(Popper)({
  zIndex: 1000,
});

const btnStyle = { backgroundColor: '#00FFF0', color: 'black', '&:hover': { backgroundColor: '#95FFF9' } };

export default function MenuExportar( { svgText, text } ) {
  const buttonRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      setOpen(false);
    } else if (event.key === 'Escape') {
      buttonRef.current.focus();
      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        ref={buttonRef}
        id="composition-button"
        aria-controls={'composition-menu'}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        color="neutral"
        sx={{
          backgroundColor: 'black',
          color: 'white',
          width: '200px'
        }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        Exportar
      </Button>

      <Popup
        role={undefined}
        id="composition-menu"
        open={open}
        anchorEl={buttonRef.current}
        placement="bottom-start"
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 4],
            },
          },
        ]}
      >
        <ClickAwayListener
          onClickAway={(event) => {
            if (event.target !== buttonRef.current) {
              handleClose();
            }
          }}
        >
          <MenuList
            variant="outlined"
            onKeyDown={handleListKeyDown}
            sx={{ boxShadow: 'md' }}
          >
            <AccordionGroup
              color="primary"
              size="sm"
              variant="plain"
              disableDivider >
              <Accordion >
                <AccordionSummary>Multimedia</AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Button onClick={()=>exportToPNG(svgText, 'diagram')}   sx={btnStyle}>
                      png
                    </Button>
                    <Button onClick={()=>exportToSVG(svgText, 'diagram')}   sx={btnStyle}>
                      svg
                    </Button>

                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary>Código</AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Button onClick={()=>exportToTxt(text, 'diagram')}  sx={btnStyle}>
                      Texto plano
                    </Button>

                    <Button sx={btnStyle}>
                      Java
                    </Button>

                    <Button sx={btnStyle}>
                      Python
                    </Button>

                    <Button sx={btnStyle}>
                      Javascript
                    </Button>
                  </Box>
                </AccordionDetails>

              </Accordion>
              <Accordion>
                <AccordionSummary>Otros archivos</AccordionSummary>
                <AccordionDetails>
                  <Box onClick={()=>exportToJSON(text, 'diagram')} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Button sx={btnStyle}>
                      JSON
                    </Button>
                    <Button onClick={()=>exportToXML(text, 'diagram')} sx={btnStyle}>
                      XML
                    </Button>
                    <Button sx={btnStyle}>
                      Architect
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </AccordionGroup>
          </MenuList>
        </ClickAwayListener>
      </Popup>
    </div>
  );
}