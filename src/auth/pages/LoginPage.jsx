import {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from 'react-router-dom';
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Google} from "@mui/icons-material";
import {AuthLayout} from "../layout/AuthLayout";
import {useForm} from "../../hooks";
import {startGoogleSignIn, startLoginWithEmailPassword} from "../../../store/auth";

const formData = {
    email: '',
    password: ''
}
export const LoginPage = () => {
    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector((state) => state.auth);

    const { email, password, onInputChange } = useForm(formData);

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(startLoginWithEmailPassword({ email, password }));
    }

    const onGoogleSingIn = () => {
        dispatch(startGoogleSignIn());
    }

    return (
        <AuthLayout
            title={'Iniciar Sesión'}
        >
            <form
                onSubmit={onSubmit}
                className={'animate__animated animate__fadeIn animate__faster'}
            >
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sx={{mt: 2}}
                    >
                        <TextField
                            label={'Email'}
                            type={'email'}
                            placeholder={'corre@google.com'}
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={ 12 }
                        sx={{ mt: 2 }}
                    >
                        <TextField
                            label={'Contraseña'}
                            type={'password'}
                            placeholder={'Contraseña'}
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid
                        container
                        spacing={ 2 }
                        sx={{
                            mb: 2,
                            mt: 1
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            display={!!errorMessage ? '': 'none' }
                        >
                            <Alert severity={'error'}>{errorMessage}</Alert>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Button
                                disabled={isAuthenticating}
                                variant={'contained'}
                                fullWidth
                                type={'submit'}
                            >
                                Iniciar Sesión
                            </Button>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Button
                                disabled={isAuthenticating}
                                onClick={onGoogleSingIn}
                                variant={'contained'}
                                fullWidth
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        sx={{
                            direction: 'row',
                            justifyContent: 'end'
                        }}
                    >
                        <Typography sx={{mr: 1}}>¿No tienes una cuenta?</Typography>
                        <Link
                            component={ RouterLink }
                            color={'inherit'}
                            to={'/auth/register'}
                        >
                            Regístrate
                        </Link>

                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};

