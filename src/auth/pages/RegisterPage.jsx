import {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {AuthLayout} from "../layout/AuthLayout";
import {useForm} from "../../hooks";
import {startCreatingWithEmailPassword} from "../../../store/auth";

const formData = {
    displayName : '',
    email       : '',
    password    : '',
}

const formValidations = {
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio.'],
    email: [(value) => value.includes('@'), 'El correo debe tener una @'],
    password: [(value) => value.length >= 6, 'El password debe tener más de 6 letras.'],
}

export const RegisterPage = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector((state) => state.auth);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

    const {
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations);

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (!isFormValid) return;
        dispatch(startCreatingWithEmailPassword(formState))

        // console.log(formState)
    }

    return (
        <AuthLayout
            title={'Registrarse'}
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
                            label={'Nombre'}
                            type={'text'}
                            placeholder={'Ingresa tu nombre'}
                            fullWidth
                            name={'displayName'}
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                        />
                    </Grid>
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
                            name={'email'}
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
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
                            name={'password'}
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
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
                        >
                            <Button
                                disabled={isCheckingAuthentication}
                                type={'submit'}
                                variant={'contained'}
                                fullWidth
                            >
                                Crear Cuenta
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
                        <Typography sx={{mr: 1}}>¿Ya tienes una cuenta?</Typography>
                        <Link
                            component={ RouterLink }
                            color={'inherit'}
                            to={'/auth/login'}
                        >
                             Inicia Sesión
                        </Link>

                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};

