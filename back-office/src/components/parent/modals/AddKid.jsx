import { useState, useEffect } from 'react';
import {
  MenuItem,
  InputLabel,
  TextField,
  Modal,
  Button,
  Box,
  Typography,
  FormControl,
  Select,
  FormHelperText,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { fetchUsersByRole } from 'src/store/reducers/userSlice';
import { addKid, fetchKids, fetchKidsByParent } from 'src/store/reducers/kidSlice';
import { toast } from 'react-toastify';
import Iconify from 'src/components/iconify';
import Autocomplete from '@mui/material/Autocomplete';

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

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  gender: Yup.string().required('Gender is required'),
  age: Yup.number().required('Age is required'),
  parentId: Yup.string().required('Parent is required'),
});

export default function AddKid() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice.user);
  const parents = useSelector((state) => state.userSlice.users?.data || []);
  const token = user.token;

  useEffect(() => {
    dispatch(fetchUsersByRole({ token, role: 'parent' })).catch((error) => {
      console.error('Error fetching users:', error);
    });
  }, [dispatch, token]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    if (token) {
      try {
        await dispatch(addKid({ kidData: values, token }));
        await dispatch(fetchKidsByParent({ parentId: user.id, token }));
        
        //await dispatch(fetchKids(token));
        handleClose();
      } catch (error) {
        toast.error(error.message, { theme: 'colored' });
        setErrors({ submit: error.message });
      }
    } else {
      toast.error('Token not available');
    }
    setSubmitting(false);
  };

  const parentOptions = parents.map((parent) => ({
    ...parent,
    fullName: `${parent.firstName} ${parent.lastName}`,
  }));

  return (
    <Box>
      <Button
      sx={{mb:'30px'}}
        onClick={handleOpen}
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Nouveau enfant
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            Ajouter un enfant
          </Typography>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              age: '',
              gender: '',
              parentId: user?.id,
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
              isValid,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
                    <Box sx={{}}>
                      <TextField
                        sx={{ width: '95%' }}
                        id="firstName"
                        name="firstName"
                        label="Prénom"
                        variant="outlined"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Box>

                    <Box sx={{}}>
                      <TextField
                        sx={{ width: '100%' }}
                        id="lastName"
                        name="lastName"
                        label="Nom"
                        variant="outlined"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Box>
                  </Box>
                  <TextField
                    sx={{ width: '100%' }}
                    id="age"
                    name="age"
                    label="Age"
                    variant="outlined"
                    value={values.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.age && Boolean(errors.age)}
                    helperText={touched.age && errors.age}
                  />
                 
                  <FormControl fullWidth error={Boolean(touched.gender && errors.gender)}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      sx={{ mb: '20px' }}
                      label="Gender"
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                    {touched.gender && errors.gender && (
                      <FormHelperText>{errors.gender}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
                {errors.submit && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {errors.submit}
                  </Typography>
                )}
                <Box sx={{ textAlign: 'end' }}>
                  <Button variant="outlined" sx={{ width: '85px' }} onClick={handleClose}>
                    Annuler
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    sx={{ width: '85px', ml: '25px' }}
                    disabled={!isValid || isSubmitting}
                  >
                    Ajouter
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </Box>
  );
}
