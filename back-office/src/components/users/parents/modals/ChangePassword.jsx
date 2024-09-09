import { useState } from 'react';
import { Container, TextField, Modal, Button, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { changePassword } from 'src/store/reducers/authSlice';
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
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string().required('New password is required'),
  newPasswordConfirm: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm your new password'),
});

export default function ChangePassword() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice.user);
  const token = user?.token;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    if (token) {
      try {
        const response = await dispatch(
          changePassword({
            userId: user.id,
            token: user.token,
            passwordData: {
              currentPassword: '',
              newPassword: values.newPassword,
              newPasswordConfirm: values.newPasswordConfirm,
            },
          })
        ).unwrap();

        // Check if the backend response indicates a password mismatch
        if (response.status === 401 || response.data?.message === 'Incorrect current password') {
          setErrors({ currentPassword: 'Incorrect current password' });
        } else {
          //toast.success('Password updated successfully');
          handleClose();
        }
      } catch (error) {
        // Handle other potential errors (e.g., network issues, server errors)
        toast.error('An error occurred while updating your password.');
        console.error(error);
      }
    } else {
      toast.error('User token not available');
    }
    setSubmitting(false);
  };
  return (
    <Box>
      <Box onClick={handleOpen} sx={{ display: 'flex', cursor: 'pointer' }}>
        <Iconify icon="eva:lock-outline" sx={{ mr: '5px', pt: '2px' }} />
        <Typography sx={{ pt: '1px' }}>Change password</Typography>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" sx={{ mb: '25px', fontWeight: 'bold' }}>
            Changer mot de passe
          </Typography>
          <Formik
            initialValues={{
              currentPassword: '',
              newPasswordConfirm: '',
              newPassword: '',
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
                <Box sx={{ mb: '15px' }}>
                  <TextField
                    sx={{ width: '100%' }}
                    id="currentPassword"
                    name="currentPassword"
                    label="Current Password"
                    variant="outlined"
                    value={values.currentPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.currentPassword && Boolean(errors.currentPassword)}
                    helperText={touched.currentPassword && errors.currentPassword}
                  />
                </Box>
                <Box sx={{ mb: '15px' }}>
                  <TextField
                    sx={{ width: '100%' }}
                    id="newPassword"
                    name="newPassword"
                    label="New Password"
                    variant="outlined"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.newPassword && Boolean(errors.newPassword)}
                    helperText={touched.newPassword && errors.newPassword}
                  />
                </Box>
                <Box sx={{ mb: '15px' }}>
                  <TextField
                    sx={{ width: '100%' }}
                    id="newPasswordConfirm"
                    name="newPasswordConfirm"
                    label="Confirm New Password"
                    variant="outlined"
                    value={values.newPasswordConfirm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.newPasswordConfirm && Boolean(errors.newPasswordConfirm)}
                    helperText={touched.newPasswordConfirm && errors.newPasswordConfirm}
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
