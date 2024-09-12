import { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Modal,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import Iconify from 'src/components/iconify';
import { fetchUsersByRole, editUser } from 'src/store/reducers/userSlice';
import { editSession, fetchSessionById, fetchSessions } from 'src/store/reducers/sessionSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', md: '500px' },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5,
};

export default function EditStatus(props) {
  const [open, setOpen] = useState(false);
  const [sessionData, setSessionData] = useState({
    status: '',
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice.user);

  useEffect(() => {
    setSessionData({
      status: props.status,
    });
  }, [props]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSessionData({
      status: props.status,
    });
  };

  const handleChange = (e) => {
    setSessionData({
      ...sessionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = user.token;
    if (token) {
      await dispatch(editSession({ sessionId: props._id, sessionData: sessionData, token }));
      await dispatch(fetchSessions(token));
      handleClose();
    } else {
      console.error('Token not available');
    }
  };

  console.log(sessionData);

  return (
    <Box>
      <Box onClick={handleOpen} sx={{ display: 'flex', cursor: 'pointer' }}>
        <Iconify icon="eva:person-done-fill" sx={{ mr: '5px', pt: '2px' }} />
        <Typography sx={{ pt: '1px' }}>Edit status</Typography>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" sx={{ mb: '25px', fontWeight: 'bold' }}>
            Edit status
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: '15px' }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  name="status"
                  value={sessionData.status}
                  onChange={handleChange}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="accepted">Accepted</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ textAlign: 'end' }}>
              <Button variant="outlined" sx={{ width: '85px' }} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="info"
                type="submit"
                sx={{ width: '85px', ml: '25px' }}
              >
                Update
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
