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
import { fetchUsers, fetchUsersByRole } from 'src/store/reducers/userSlice';
import { register } from 'src/store/reducers/authSlice';
import { toast } from 'react-toastify';
import Iconify from 'src/components/iconify';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete'

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
  email: Yup.string().email('Must be a valid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  location: Yup.string().required('Location is required'),
  gender: Yup.string().required('Gender is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function AddKid() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice.user);
  const parents = useSelector((state) => state.userSlice.users?.data || []);
  const token = user.token;

  useEffect(() => {
    //setLoading(true);
    dispatch(fetchUsersByRole({ token, role: 'parent' }))
      //.then(() => setLoading(false))
      .catch((error) => {
        console.error('Error fetching users:', error);
        //setLoading(false);
      });
  }, [dispatch, token]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const token = user.token;
    if (token) {
      try {
        await dispatch(fetchUsers(token));
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
              email: '',
              phone: '',
              location: '',
              gender: '',
              role: 'parent',
              status: 'active',
              password: '',
              passwordConfirm: '',
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
              isSubmitting,
              isValid,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
                    <Box sx={{  }}>
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
                    <Box sx={{  }}>
                      <TextField
                        sx={{ width: '95%' }}
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
                  <Autocomplete
                    disablePortal
                    options={parentOptions}
                    getOptionLabel={(option) => option.fullName}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Parent" />}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <FormControl fullWidth error={Boolean(touched.gender && errors.gender)}>
                    <InputLabel>Gender</InputLabel>
                    <Select
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
                  <TextField
                    fullWidth
                    label="Adresse"
                    name="location"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.location}
                    error={touched.location && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                  />
                  <TextField
                    fullWidth
                    label="Mot de passe"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <TextField
                    sx={{ mb: '15px' }}
                    fullWidth
                    label="Confirmer mot de passe"
                    name="passwordConfirm"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordConfirm}
                    error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
                    helperText={touched.passwordConfirm && errors.passwordConfirm}
                  />
                </Box>
                {errors.submit && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {errors.submit}
                  </Typography>
                )}
                {/* <Box sx={{ mt: 3 }}>
                  <LoadingButton
                    disableElevation
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="inherit"
                    loading={isSubmitting}
                  >
                    Ajouter
                  </LoadingButton>
                </Box> */}
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
