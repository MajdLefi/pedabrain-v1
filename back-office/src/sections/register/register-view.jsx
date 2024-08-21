import { useState } from 'react';

import {Box, Grid, InputAdornment , Link, Card, Stack, TextField, Typography, IconButton }from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import * as Yup from 'yup';
import { Formik } from 'formik';
// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClick = () => {
    router.push('/');
  };

  const renderForm = (
    <>
    <Grid container spacing={3} sx={{mb:"40px"}}>
      <Grid item xs={12} md={6} sx={{}}>
        <Box sx={{mb:"20px"}}>
          <TextField sx={{width:"100%"}} name="firstName" label="First name" />
        </Box>
        <Box sx={{mb:"20px"}}>
          <TextField sx={{width:"100%"}} name="email" label="Email address" />
        </Box>
        <Box sx={{mb:"20px"}}>
          <TextField sx={{width:"100%"}} name="gender" label="Gender" />
        </Box>
        <Box sx={{mb:'20px'}}>
        <TextField
        sx={{ width: "100%" }}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </Box>
      
      </Grid>
      <Grid item xs={12} md={6} sx={{}}>
        <Box sx={{mb:"20px"}}>
          <TextField sx={{width:"100%"}} name="lastName" label="Last name" />
        </Box>
        <Box sx={{mb:"20px"}}>
          <TextField sx={{width:"100%"}} name="phone" label="Phone" />
        </Box>
        <Box sx={{mb:"20px"}}>
          <TextField sx={{width:"100%"}} name="location" label="Location" />
        </Box>
        <Box sx={{mb:'20px'}}>
        <TextField
        sx={{ width: "100%" }}
          name="password"
          label="Password"
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </Box>
      </Grid>
      </Grid>
    
      {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton
        sx={{width:"50%"}}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Register
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 920,
          }}
        >
          <Typography variant="h4">Register to PEDABRAIN</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Alrerady have an account?
            <Link href="/login" variant="subtitle2" sx={{ ml: 0.5 }}>
             Login
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
