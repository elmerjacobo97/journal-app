import {doc, collection, deleteDoc, setDoc} from 'firebase/firestore/lite';
import {FirebaseDB} from "../../src/firebase/config";
import {
    addNewEmptyNote, deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote
} from "./";
import {fileUpload, loadNotes} from "../../src/helpers";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote());

        // Extraer el uid del user
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`)); // crear
        await setDoc(newDoc, newNote); // almacenar

        // Agregar id a la nueva nota
        newNote.id = newDoc.id;
        console.log(newNote)

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        // Eliminar el id de la nota
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        // Referencia al documento
        const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${note.id}`);

        // Almacenar en BD
        await setDoc(docRef, noteToFirestore, { merge: true })

        // Actualizar la nota
        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());

        // await fileUpload(files[0]);
        // La idea es que las imágenes se suban todas al mismo tiempo
        const filesUploadPromises = [];
        for (const file of files) {
            filesUploadPromises.push(fileUpload(file));
        }
        console.log(filesUploadPromises)

        const photosUrls = await Promise.all(filesUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const {active: note} = getState().journal;

        const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    }
}