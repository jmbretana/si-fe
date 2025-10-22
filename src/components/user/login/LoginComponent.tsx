import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';

import { Backdrop, CircularProgress, Alert } from '@mui/material';

import {
  createTheme,
  ThemeProvider,
  styled,
  PaletteMode,
} from '@mui/material/styles';
import getSignUpTheme from './theme/getSignUpTheme';

import TerrainIcon from '@mui/icons-material/Terrain';

import { useDispatch, useSelector } from 'react-redux';
import { getUserLogin, makeRequestUser } from '@actions/usersActions';
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from 'src/middleware/types/UserActionTypes';
import { useAuth } from '@auth/AuthContext';
import { AppDispatch, RootState } from 'src/middleware/store/store';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: 4,
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

interface LoginFormData {
  username: string;
  password: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = React.useState<PaletteMode>('dark');
  const SignUpTheme = createTheme(getSignUpTheme(mode));

  const [usernameError, setUsernameError] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);

  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [sessionExpiredMessage, setSessionExpiredMessage] =
    useState<string>('');

  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.users.status);
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });

  useEffect(() => {
    dispatch(makeRequestUser());
    const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }

    // Check if user was redirected due to session expiration
    const state = location.state as any;
    if (state?.sessionExpired) {
      setSessionExpiredMessage(
        'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
      );
      // Clear the state to prevent showing the message on page refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Add useEffect to check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isAuthenticated) {
          navigate('/presupuestos');
        }
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (submit && status === USER_LOGIN_SUCCESS) {
      login(formData);
      setSubmit(false);
      navigate('/presupuestos');
    }

    if (status === USER_LOGIN_FAIL) {
      setLoading(false);
      setSubmit(false);
      setPasswordError(true);
      setPasswordErrorMessage('Usuario/contraseña incorrectos.');
    }
  }, [submit, status]);

  if (isCheckingAuth) {
    return <CircularProgress />; // Add loading indicator
  }

  const validateInputs = () => {
    const password = document.getElementById('passTerra') as HTMLInputElement;

    let isValid = true;

    if (!formData.username) {
      setUsernameError(true);
      setUsernameErrorMessage('Usuario es requerido.');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(
        'La contraseña debe ser al menos de 6 caracteres de largo.',
      );
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (validateInputs()) {
        setLoading(true);

        dispatch(getUserLogin(formData));
        setSubmit(true);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <CssBaseline enableColorScheme />

      <SignUpContainer direction="column" justifyContent="space-between">
        <Stack
          sx={{
            justifyContent: 'center',
            height: '100dvh',
            p: 1,
          }}
        >
          {sessionExpiredMessage && (
            <Alert
              severity="warning"
              onClose={() => setSessionExpiredMessage('')}
              sx={{ mb: 1 }}
            >
              {sessionExpiredMessage}
            </Alert>
          )}

          <Card variant="outlined">
            <Box display={'flex'}>
              <TerrainIcon />

              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', sm: 'block' },
                  paddingLeft: '7px',
                }}
              >
                Simon
              </Typography>
            </Box>
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(1rem, 10vw, 1.25rem)' }}
            >
              Ingresar
            </Typography>

            <Box
              component="form"
              method="post"
              action="#"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="userTerra">Usuario</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="userTerra"
                  name="username"
                  autoComplete="username"
                  variant="outlined"
                  error={usernameError}
                  helperText={usernameErrorMessage}
                  color={passwordError ? 'error' : 'primary'}
                  value={formData.username}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="passTerra">Contraseña</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="passTerra"
                  autoComplete="current-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? 'error' : 'primary'}
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormControl>

              <Button type="submit" fullWidth variant="contained">
                Ingresar
              </Button>
            </Box>
          </Card>
        </Stack>
      </SignUpContainer>

      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}
