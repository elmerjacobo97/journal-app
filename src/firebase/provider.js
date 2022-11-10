import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import {FirebaseAuth} from "./config";

const googleProvider = new GoogleAuthProvider();

// Iniciar sesión con google
export const singInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = await GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

// Crear usuario con nombre, correo y password
export const registerUserWithEmailPassword = async ({ displayName, email, password }) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        // console.log(resp)

        // Actualizar displayName en firebase
        await updateProfile(FirebaseAuth.currentUser, {displayName});

        return {
            ok: true,
            uid, photoURL, email, password, displayName
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const loginWithEmailPassword = async ({email, password}) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { displayName, uid, photoURL } = resp.user;

        return {
            ok: true,
            displayName, uid, photoURL
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}
