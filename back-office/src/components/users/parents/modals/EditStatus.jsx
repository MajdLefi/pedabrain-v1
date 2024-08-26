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
  const [userData, setUserData] = useState({
    status: '',
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice.user);

  useEffect(() => {
    setUserData({
      status: props.status,
    });
  }, [props]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUserData({
      status: props.status,
    });
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = user.token;
    if (token) {
      await dispatch(editUser({ userId: props._id, userData: userData, token }));
      await dispatch(fetchUsersByRole({ token, role: 'parent' }));
      handleClose();
    } else {
      console.error('Token not available');
    }
  };

  console.log(userData);

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
                  value={userData.status}
                  onChange={handleChange}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="banned">Banned</MenuItem>
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
