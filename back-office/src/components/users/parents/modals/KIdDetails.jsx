import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { fetchKids } from 'src/store/reducers/kidSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function KidDetails() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // useEffect(() => {
  //   //setLoading(true);
  //   dispatch(fetchKids({ token }))
  //     //.then(() => setLoading(false))
  //     .catch((error) => {
  //       console.error('Error fetching users:', error);
  //       //setLoading(false);
  //     });
  // }, [dispatch, token]);

  return (
    <Box>
      {/* <Button onClick={handleOpen}>Enfant</Button> */}
      <Box onClick={handleOpen} sx={{ cursor: 'pointer' }}>
        <svg viewBox="0 0 24 24" fill="currentColor" height="1.9em" width="1.9em">
          <path d="M10 10a1 1 0 10-1 1 1 1 0 001-1zm4.5 4.06a1 1 0 00-1.37.36 1.3 1.3 0 01-2.26 0 1 1 0 00-1.37-.36 1 1 0 00-.37 1.36 3.31 3.31 0 005.74 0 1 1 0 00-.37-1.36zM15 9a1 1 0 101 1 1 1 0 00-1-1zm-3-7a10 10 0 1010 10A10 10 0 0012 2zm0 18A8 8 0 019 4.57 3 3 0 009 5a3 3 0 003 3 1 1 0 000-2 1 1 0 010-2 8 8 0 010 16z" />
        </svg>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enfants
          </Typography>
          <Button onClick={handleClose} variant='contained' sx={{position:'absolute', bottom:'20px', right:'20px'}}>Fermer</Button>
        </Box>
      </Modal>
    </Box>
  );
}
