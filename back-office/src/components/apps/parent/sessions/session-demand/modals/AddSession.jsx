import { useEffect, useState } from 'react';
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
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { fetchUsers } from 'src/store/reducers/userSlice';
import { register } from 'src/store/reducers/authSlice';
import { toast } from 'react-toastify';
import Iconify from 'src/components/iconify';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchKidsByParent } from 'src/store/reducers/kidSlice';

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

export default function AddParent() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(dayjs('2022-04-17'));

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice.user);
  const kids = useSelector((state) => state.kidSlice.kids?.data || []);
  const token = user.token;

  useEffect(() => {
    dispatch(fetchKidsByParent({ parentId: user.id, token })).catch((error) => {
      console.error('Error fetching users:', error);
    });
  }, [dispatch, token]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const token = user.token;
    if (token) {
      try {
        await dispatch(register({ ...values, role: 'parent' }));
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

  const parentOptions = kids.map((kid) => ({
    ...kid,
    fullName: `${kid.firstName} ${kid.lastName}`,
  }));

  return (
    <Box>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Nouvelle demande
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            Demander une séance
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
                  <Box>
                    <Autocomplete
                      disablePortal
                      options={parentOptions}
                      getOptionLabel={(option) => option.fullName}
                      sx={{ width: '100%', mb: '20px' }}
                      onChange={(event, value) => {
                        setFieldValue('parentId', value ? value._id : '');
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Enfant"
                          error={touched.parentId && Boolean(errors.parentId)}
                          helperText={touched.parentId && errors.parentId}
                        />
                      )}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ width: '100%', mb: '20px' }}
                        label="Choisir le jour"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker sx={{ width: '100%' }} label="Choisir l'heure" />
                    </LocalizationProvider>
                  </Box>
                  <FormControl fullWidth error={Boolean(touched.gender && errors.gender)}>
                    <InputLabel>Motif</InputLabel>
                    <Select
                      label="Motif"
                      name="motif"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="motif1">Motif 1</MenuItem>
                      <MenuItem value="motif2">Motif 2</MenuItem>
                      <MenuItem value="motif3">Motif 3</MenuItem>
                      <MenuItem value="motif4">Motif 4</MenuItem>
                    </Select>
                    {touched.gender && errors.gender && (
                      <FormHelperText>{errors.gender}</FormHelperText>
                    )}
                  </FormControl>
                  <TextField
                    sx={{ mb: '20px' }}
                    id="outlined-multiline-static"
                    label="Remarques"
                    multiline
                    rows={4}
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
