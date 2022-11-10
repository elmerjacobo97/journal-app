import {
    loginWithEmailPassword,
    logoutFirebase,
    registerUserWithEmailPassword,
    singInWithGoogle
} from "../../src/firebase/provider";
import {checkingCredential, login, logout} from "./";
import {clearNotesLogout} from "../journal";

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredential());
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredential());

        const result = await singInWithGoogle();

        // Si sucede un error ...
        if (!result.ok) return dispatch(logout(result.errorMessage));

        // Si todo sale bien ...
        dispatch(login(result));
    }
}

export const startCreatingWithEmailPassword = ({displayName, email, password}) => {
    return async (dispatch) => {
        dispatch(checkingCredential());

        const { ok, uid, errorMessage, photoURL } = await registerUserWithEmailPassword({displayName, email, password});

        if (!ok) return dispatch(logout({errorMessage}));

        dispatch(login({ uid, displayName, email, photoURL }));
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async (dispatch) => {
        dispatch(checkingCredential());
        const result = await loginWithEmailPassword({email, password});

        if (!result.ok) return dispatch(logout(result));
        dispatch(login(result));
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(clearNotesLogout())
        dispatch(logout());
    }
}