import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import { fetchKidsByParent } from 'src/store/reducers/kidSlice';
import { useSelector, useDispatch } from 'react-redux';

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
  display: 'flex',
  flexDirection: 'column',
};

const contentStyle = {
  overflowY: 'auto',
  flexGrow: 1, // Allow content to grow and take up available space
};

const loaderStyle = {
  width: '48px',
  height: '48px',
  border: '5px solid #FFF',
  borderBottomColor: 'transparent',
  borderRadius: '50%',
  display: 'inline-block',
  boxSizing: 'border-box',
  animation: 'rotation 1s linear infinite',
};

export default function KidDetails(props) {
  const { _id, token } = props;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const kids = useSelector((state) => state.kidSlice.kids?.data || []);

  const handleOpen = () => {
    setOpen(true);
    setLoading(true);
    dispatch(fetchKidsByParent({ parentId: _id, token }))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching kids:', error);
        setLoading(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
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
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: '20px' }}>
            Enfants
          </Typography>
          <Box sx={contentStyle}>
  {loading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Typography sx={{ ml: 2 }}>Loading...</Typography>
    </Box>
  ) : (
    kids.length === 0 ? (
      <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
        Pas d'enfants pour ce parent ! 
      </Typography>
    ) : (
      kids.map((kid, index) => (
        <Box key={kid._id}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1">- Nom et prénom : {`${kid.firstName} ${kid.lastName}`}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body1">- Genre: {kid.gender}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body1">- Age: {kid.age}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body1">Problème: {kid.problem}</Typography>
          </Box>
          {index < kids.length - 1 && <Divider sx={{ my: 2 }} />} {/* Divider between kids */}
        </Box>
      ))
    )
  )}
</Box>

          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ position: 'relative', mt: 2 }} // Margin on top to separate from scrollable content
          >
            Fermer
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
