import { useState, useEffect } from 'react';
import { Modal, Button, Box, Typography, TextField, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKids, editKid } from 'src/store/reducers/kidSlice';
import Iconify from 'src/components/iconify';

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

export default function EditKid(props) {
  const [open, setOpen] = useState(false);
  const [kidData, setKidData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice.user);
  const token = user.token;

  useEffect(() => {
    setKidData({
      firstName: props.firstName || '',
      lastName: props.lastName || '',
      age: props.age || '',
      gender: props.gender || '',
    });
  }, [props]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setKidData({
      firstName: props.firstName || '',
      lastName: props.lastName || '',
      age: props.age || '',
      gender: props.gender || '',
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setKidData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGenderChange = (e) => {
    setKidData((prevState) => ({
      ...prevState,
      gender: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token) {
      try {
        await dispatch(editKid({ kidId: props._id, kidData, token }));
        await dispatch(fetchKids( token ));

        handleClose();
      } catch (error) {
        console.error('Error updating kid:', error);
      }
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
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            Modifier cet enfant
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: 2 }}>
              <Box sx={{ mb: '15px', flex: 1 }}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="Prénom"
                  variant="outlined"
                  value={kidData.firstName}
                  onChange={onChange}
                />
              </Box>
              <Box sx={{ mb: '15px', flex: 1 }}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Nom"
                  variant="outlined"
                  value={kidData.lastName}
                  onChange={onChange}
                />
              </Box>
            </Box>
            <Box sx={{ mb: '15px' }}>
              <TextField
                fullWidth
                id="age"
                name="age"
                label="Âge"
                variant="outlined"
                value={kidData.age}
                onChange={onChange}
              />
            </Box>
            <Box sx={{ mb: '15px' }}>
              <Select
                fullWidth
                id="gender"
                name="gender"
                value={kidData.gender}
                onChange={handleGenderChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </Box>
            <Box sx={{ textAlign: 'end' }}>
              <Button variant="outlined" sx={{ width: '85px' }} onClick={handleClose}>
                Annuler
              </Button>
              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{ width: '85px', ml: '25px' }}
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
