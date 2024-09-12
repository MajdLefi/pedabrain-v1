import { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Modal,
  Button,
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, editUser } from 'src/store/reducers/userSlice';
import { toast } from 'react-toastify';
import Iconify from 'src/components/iconify';
import { fetchUsersByRole } from 'src/store/reducers/userSlice';
import { editSession, fetchSessions } from 'src/store/reducers/sessionSlice';

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

export default function EditSession(props) {
  const [open, setOpen] = useState(false);
  const [sessionData, setSessionData] = useState({
    kidId: '',
    doctor: '',
    problem: '',
    sessionDate: '',
    status: '',
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice.user);

  useEffect(() => {
    setSessionData({
      kidId: props.kidId,
      doctor: props.doctor,
      problem: props.problem,
      sessionDate: props.sessionDate,
      status: props.status,
    });
  }, [props]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSessionData({
      kidId: props.kidId,
      doctor: props.doctor,
      problem: props.problem,
      sessionDate: props.sessionDate,
      status: props.status,
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setSessionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSessionChange = (e) => {
    setSessionData((prevState) => ({
      ...prevState,
      status: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    const token = user.token;

    e.preventDefault();
    if (token) {
      await dispatch(editSession({ sessionId: props._id, sessionData: sessionData, token }));
      await dispatch(fetchSessions(token));
      handleClose();
    } else {
      console.error('Token not available');
    }
  };

  return (
    <Box>
      <Box onClick={handleOpen} sx={{ display: 'flex', width: '180%' }}>
        <Iconify icon="eva:edit-fill" sx={{ mr: '5px', pt: '2px' }} />
        <Typography sx={{ pt: '1px' }}>Modifier séance</Typography>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" sx={{ mb: '25px', fontWeight: 'bold' }}>
            Modifier cette séance
          </Typography>
          <form onSubmit={handleSubmit}>
              {/* <Box sx={{ mb: '15px' }}>
                <TextField
                  sx={{ width: '100%' }}
                  id="kidId"
                  name="kidId"
                  label="Enfant"
                  variant="outlined"
                  value={sessionData.kidId}
                  onChange={onChange}
                />
              </Box> */}
              <Box sx={{ mb: '15px' }}>
                <TextField
                  sx={{ width: '100%' }}
                  id="doctor"
                  name="doctor"
                  label="Educateur"
                  variant="outlined"
                  value={sessionData.doctor}
                  onChange={onChange}
                />
              </Box>
            <Box sx={{ mb: '15px' }}>
              <TextField
                sx={{ width: '100%' }}
                id="problem"
                name="problem"
                label="problem"
                variant="outlined"
                value={sessionData.problem}
                onChange={onChange}
              />
            </Box>
            <Box sx={{ mb: '15px' }}>
              <TextField
                sx={{ width: '100%' }}
                id="sessionDa"
                name="session"
                label="sessionDate"
                variant="outlined"
                value={sessionData.sessionDate}
                onChange={onChange}
              />
            </Box>
            <Box sx={{ mb: '15px' }}>
            <TextField
                      sx={{ width: '100%', mb:'20px' }}
                      id="problem"
                      name="problem"
                      label="Problem"
                      variant="outlined"
                      value={sessionData.problem}
                      multiline
                      rows={4}
                      onChange={onChange}
                      //onBlur={handleBlur}
                      //error={touched.problem && Boolean(errors.problem)}
                      //helperText={touched.problem && errors.problem}
                  />
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
                //disabled={!isValid || isSubmitting}
              >
                Modifier
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
