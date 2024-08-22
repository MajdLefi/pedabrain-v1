import { useState, useEffect } from 'react';
import { Container, TextField, Modal, Button, Box, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
// import { addHospital, fetchHospitals } from 'store/reducers/hospitalSlice';
import { toast } from 'react-toastify';
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

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  gender: Yup.string().required('Gender is required'),
  password: Yup.string().required('Password is required'),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export default function EditParent() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  //const user = useSelector((state) => state.authSlice.user);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    // const token = user.token;
    // if (token) {
    //   try {
    //     await dispatch(addHospital({ hospitalData: values, token }));
    //     await dispatch(fetchHospitals(token));
    //     handleClose();
    //   } catch (error) {
    //     toast.error(error.message, { theme: 'colored' });
    //     setErrors(error.response.data.errors);
    //   }
    // } else {
    //   toast.error('Token not available');
    // }
    // setSubmitting(false);
  };

  return (
    <Box>
      <Box onClick={handleOpen} sx={{ display: 'flex' }}>
        {/* <Iconify icon="eva:edit-fill" sx={{ ml: '5px', mr: '5px' }} /> */}
        <Typography sx={{ pt: '1px', }}>Modifier</Typography>
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
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              gender: '',
              location: '',
              //birthday : '',
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
                <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
                  <Box sx={{ mb: '15px' }}>
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
                  <Box sx={{ mb: '15px' }}>
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
                <Box sx={{ mb: '15px' }}>
                  <TextField
                    sx={{ width: '100%' }}
                    id="phone"
                    name="phone"
                    label="Téléphone"
                    variant="outlined"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Box>
                <Box sx={{ mb: '15px' }}>
                  <TextField
                    sx={{ width: '100%' }}
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Box>
                <Box sx={{ mb: '15px' }}>
                  <TextField
                    sx={{ width: '100%' }}
                    id="gender"
                    name="gender"
                    label="Gender"
                    variant="outlined"
                    value={values.cin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.gender && Boolean(errors.gender)}
                    helperText={touched.gender && errors.gender}
                  />
                </Box>
                <Box sx={{ mb: '15px' }}>
                  <TextField
                    sx={{ width: '100%' }}
                    id="location"
                    name="location"
                    label="Adresse"
                    variant="outlined"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.location && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                  />
                </Box>
                <Box sx={{ mb: '15px' }}>
                  <TextField
                    sx={{ width: '100%' }}
                    id="password"
                    name="password"
                    label="Générer mot de passe"
                    variant="outlined"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
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
                    disabled={!isValid || isSubmitting}
                  >
                    Update
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
