import { useState, useEffect } from 'react';
import { Container, TextField, Modal, Button, Box, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { fetchUsers, editUser } from 'src/store/reducers/userSlice';
import { toast } from 'react-toastify';
import Iconify from 'src/components/iconify';
import { fetchUsersByRole } from 'src/store/reducers/userSlice';

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

export default function EditParent(props) {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    gender: '',
  });
  const dispatch = useDispatch();
  const parent = useSelector((state) => state.authSlice.user);
  console.log(props);
  useEffect(() => {
    setUserData({
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      phone: props.phone,
      location: props.location,
      gender: props.gender,
    });
  }, [props]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUserData({
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      phone: props.phone,
      location: props.location,
      gender: props.gender,
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const token = parent.token; // Retrieve token from user object

    e.preventDefault();
    if (token) {
      await dispatch(editUser({ userId: props._id, userData: userData, token }));
      await dispatch(fetchUsersByRole({ token, role: 'parent' }));
      handleClose();
    } else {
      console.error('Token not available');
    }
  };

  return (
    <Box>
      <Box onClick={handleOpen} sx={{ display: 'flex', width: '180%' }}>
        <Iconify icon="eva:edit-fill" sx={{ mr: '5px', pt: '2px' }} />
        <Typography sx={{ pt: '1px' }}>Modifier</Typography>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" sx={{ mb: '25px', fontWeight: 'bold' }}>
            Modifier ce parent
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
              <Box sx={{ mb: '15px' }}>
                <TextField
                  sx={{ width: '95%' }}
                  id="firstName"
                  name="firstName"
                  label="Prénom"
                  variant="outlined"
                  value={userData.firstName}
                  onChange={onChange}
                />
              </Box>
              <Box sx={{ mb: '15px' }}>
                <TextField
                  sx={{ width: '95%' }}
                  id="lastName"
                  name="lastName"
                  label="Nom"
                  variant="outlined"
                  value={userData.lastName}
                  onChange={onChange}
                />
              </Box>
            </Box>
            <Box sx={{ mb: '15px' }}>
              <TextField
                sx={{ width: '100%' }}
                id="phone"
                name="phone"
                label="Téléphone"
                variant="outlined"
                value={userData.phone}
                onChange={onChange}
              />
            </Box>
            <Box sx={{ mb: '15px' }}>
              <TextField
                sx={{ width: '100%' }}
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                value={userData.email}
                onChange={onChange}
              />
            </Box>
            <Box sx={{ mb: '15px' }}>
              <TextField
                sx={{ width: '100%' }}
                id="gender"
                name="gender"
                label="Gender"
                variant="outlined"
                value={userData.cin}
                onChange={onChange}
              />
            </Box>
            <Box sx={{ mb: '15px' }}>
              <TextField
                sx={{ width: '100%' }}
                id="location"
                name="location"
                label="Adresse"
                variant="outlined"
                value={userData.location}
                onChange={onChange}
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
                Update
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
