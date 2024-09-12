import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import { fetchKidsByParent } from 'src/store/reducers/kidSlice';
import { useSelector, useDispatch } from 'react-redux';
import Iconify from 'src/components/iconify';

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

export default function TestDetails(props) {
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
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="m19.74 7.33l-4.44-5a1 1 0 0 0-.74-.33h-8A2.53 2.53 0 0 0 4 4.5v15A2.53 2.53 0 0 0 6.56 22h10.88A2.53 2.53 0 0 0 20 19.5V8a1 1 0 0 0-.26-.67M9 12h3a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2m6 6H9a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2m-.29-10a.79.79 0 0 1-.71-.85V4l3.74 4Z"
          />
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
            Fiche de {props.kidFullName}
          </Typography>
          {/* <Box sx={contentStyle}>
            {loading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Typography sx={{ ml: 2 }}>Loading...</Typography>
              </Box>
            ) : kids.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                Pas d'informations !
              </Typography>
            ) : (
              kids.map((kid, index) => (
                <Box key={kid._id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1">
                      - Nom et prénom : {`${kid.firstName} ${kid.lastName}`}
                    </Typography>
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
                  {index < kids.length - 1 && <Divider sx={{ my: 2 }} />}{' '}
                </Box>
              ))
            )}
          </Box> */}
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: '20px' }}>
            Problème : {props.problem}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: '20px' }}>
            Evaluation :
          </Typography>
          <Box sx={{ display: 'flex', mb: '20px' }}>
            <Iconify icon="eva:shield-outline" sx={{ mr: '5px', pt: '2px' }} />
            <Typography>Test de compétances : </Typography>
          </Box>

          <Typography id="modal-modal-title" component="h2" sx={{ mb: '20px' }}>
            {props.testSkills}
          </Typography>

          <Box sx={{ display: 'flex', mb: '20px' }}>
            <Iconify icon="eva:search-fill" sx={{ mr: '5px', pt: '2px' }} />
            <Typography>Test d'obsérvation : </Typography>
          </Box>
          <Typography id="modal-modal-title" component="h2" sx={{ mb: '20px' }}>
            {props.testObservations}
          </Typography>
          <Box sx={{ display: 'flex', mb: '20px' }}>
            <Iconify icon="eva:file-text-fill" sx={{ mr: '5px', pt: '2px' }} />
            <Typography>Planning de la séance : </Typography>
          </Box>
          <Typography id="modal-modal-title" component="h2" sx={{ mb: '20px' }}>
            {props.sessionPlan}
          </Typography>
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
