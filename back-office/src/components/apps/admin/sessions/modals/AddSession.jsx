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
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { fetchKidsByParent } from 'src/store/reducers/kidSlice';
import { addSession } from 'src/store/reducers/sessionSlice';
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
  kidId: Yup.string().required('Selecting a kid is required'),
  problem: Yup.string().required('Problem is required'),
  sessionDate: Yup.date().required('Session date is required'),
  status: Yup.string().required('Status is required'),
});

export default function AddKid() {
  const [open, setOpen] = useState(false);
  const [sessionDate, setSessionDate] = useState(null);
  const [time, setTime] = useState(null);
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
    if (token) {
      try {
        await dispatch(addSession({ sessionData: values, token }));
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

  const combineDateTime = (date, time) => {
    if (!date || !time) return null;

    const combined = dayjs(date)
      .hour(dayjs(time).hour())
      .minute(dayjs(time).minute())
      .second(0)
      .millisecond(0);
    
    return combined.toISOString(); // Convert to "YYYY-MM-DDTHH:mm:ss.sssZ" format
  };

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
              kidId: '',
              problem: '',
              sessionDate: '',
              status: 'pending',
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
                  <TextField
                    sx={{ width: '100%' }}
                    id="kidId"
                    name="kidId"
                    label="kidId"
                    variant="outlined"
                    value={values.kidId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.kidId && Boolean(errors.kidId)}
                    helperText={touched.kidId && errors.kidId}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: '100%', mb: '20px' }}
                      label="Choisir le jour"
                      value={sessionDate}
                      onChange={(newValue) => {
                        setSessionDate(newValue);
                        setFieldValue('sessionDate', combineDateTime(newValue, time));
                      }}
                    />
                    <TimePicker
                      sx={{ width: '100%' }}
                      label="Choisir l'heure"
                      value={time}
                      onChange={(newValue) => {
                        setTime(newValue);
                        setFieldValue('sessionDate', combineDateTime(sessionDate, newValue));
                      }}
                    />
                  </LocalizationProvider>

                  <FormControl fullWidth error={Boolean(touched.problem && errors.problem)}>
                    <InputLabel>problem</InputLabel>
                    <Select
                      label="problem"
                      name="problem"
                      value={values.problem}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="motif1">Motif 1</MenuItem>
                      <MenuItem value="motif2">Motif 2</MenuItem>
                      <MenuItem value="motif3">Motif 3</MenuItem>
                      <MenuItem value="motif4">Motif 4</MenuItem>
                    </Select>
                    {touched.problem && errors.problem && (
                      <FormHelperText>{errors.problem}</FormHelperText>
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
