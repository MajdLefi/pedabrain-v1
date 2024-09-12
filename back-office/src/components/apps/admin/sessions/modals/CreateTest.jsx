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
  Autocomplete,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { fetchKids, fetchKidsByParent } from 'src/store/reducers/kidSlice';
import { addSession, fetchSessions, editSession } from 'src/store/reducers/sessionSlice';
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
  p: 3,
};

const validationSchema = Yup.object().shape({
  testSkills: Yup.string(),
  testObservations: Yup.string(),
  sessionPlan: Yup.string(),
});

export default function CreateTest(props) {
  const {_id, token} = props
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    if (token) {
      try {
        await dispatch(editSession({ sessionId: _id, sessionData: values, token : token }));
        await dispatch(fetchSessions(token));
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

  return (
    <Box>
      <Box onClick={handleOpen} sx={{ display: 'flex', width: '180%' }}>
        <Iconify icon="eva:edit-fill" sx={{ mr: '5px', pt: '2px' }} />
        <Typography sx={{ pt: '1px' }}>Evaluation</Typography>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            Evaluation de la séance
          </Typography>
          <Formik
            initialValues={{
              testSkills: '',
              testObservations: '',
            }}
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
                  {/* <TextField
                    sx={{ width: '100%' }}
                    id="testSkills"
                    name="testSkills"
                    label="testSkills"
                    variant="outlined"
                    value={values.testSkills}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.testSkills && Boolean(errors.testSkills)}
                    helperText={touched.testSkills && errors.testSkills}
                  /> */}
                  <Box sx={{display:'flex'}}>
                    <Iconify icon="eva:shield-outline" sx={{ mr: '5px', pt: '2px' }} />
                    <Typography>Test de compétances : </Typography>
                  </Box>

                  <TextField
                    sx={{ width: '100%' }}
                    id="testSkills"
                    name="testSkills"
                    label="Compétances"
                    variant="outlined"
                    value={values.testSkills}
                    multiline
                    rows={3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.testSkills && Boolean(errors.testSkills)}
                    helperText={touched.testSkills && errors.testSkills}
                  />
                   <Box sx={{display:'flex'}}>
                    <Iconify icon="eva:search-fill" sx={{ mr: '5px', pt: '2px' }} />
                    <Typography>Test d'obsérvation :  </Typography>
                  </Box>
                  <TextField
                    sx={{ width: '100%' }}
                    id="testObservations"
                    name="testObservations"
                    label="Obsérvations"
                    variant="outlined"
                    value={values.testObservations}
                    multiline
                    rows={3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.testObservations && Boolean(errors.testObservations)}
                    helperText={touched.testObservations && errors.testObservations}
                  />
                    <Box sx={{display:'flex'}}>
                    <Iconify icon="eva:file-text-fill" sx={{ mr: '5px', pt: '2px' }} />
                    <Typography>Planning de la séance</Typography>
                  </Box>
                  <TextField
                    sx={{ width: '100%', mb: '20px' }}
                    id="sessionPlan"
                    name="sessionPlan"
                    label="Planning"
                    variant="outlined"
                    value={values.sessionPlan}
                    multiline
                    rows={3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.sessionPlan && Boolean(errors.sessionPlan)}
                    helperText={touched.sessionPlan && errors.sessionPlan}
                  />
                  {/* <FormControl sx={{mb: '20px'}} fullWidth error={Boolean(touched.problem && errors.problem)}>
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
                  </FormControl> */}
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
