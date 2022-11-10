import {useEffect, useMemo, useRef} from "react";
import {Button, Grid, IconButton, TextField, Typography} from "@mui/material";
import {DeleteOutline, SaveOutlined, UploadOutlined} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';
import {ImageGallery} from "../components";
import {useForm} from "../../hooks";
import {setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles} from "../../../store/journal";

export const NoteView = () => {
    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector((state) => state.journal);
    const {title, body, date, onInputChange, formState} = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString();

    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota Actualizada', messageSaved, 'success');
        }
    }, [messageSaved])

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = (e) => {
        if (e.target.files === 0) return;

        dispatch(startUploadingFiles(e.target.files));
    }

    // Eliminar una nota
    const onDelete = () => {
        dispatch(startDeletingNote());
    }

    return (
        <Grid
            className={'animate__animated animate__fadeIn animate__faster'}
            container
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{
                mb: 1
            }}
        >
            <Grid item>
                <Typography
                    fontSize={30}
                    fontWeight={'lighter'}
                >
                    Fecha: {dateString}
                </Typography>
            </Grid>
            <Grid item>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{display: 'none'}}
                />

                <IconButton
                    color={'primary'}
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    disabled={isSaving}
                    onClick={onSaveNote}
                    color={'primary'}
                    sx={{
                        padding: 2,
                    }}
                >
                    <SaveOutlined
                        sx={{
                            fontSize: 30,
                            mr: 1
                        }}
                    />
                    Guardar
                </Button>
            </Grid>
            <Grid
                container
            >
                <TextField
                    type={'text'}
                    variant={'filled'}
                    fullWidth
                    placeholder={'Ingrese un título'}
                    label={'Título'}
                    sx={{
                        border: 'none',
                        my: 1
                    }}
                    name={'title'}
                    value={title}
                    onChange={onInputChange}
                />
                <TextField
                    type={'text'}
                    variant={'filled'}
                    fullWidth
                    multiline
                    placeholder={'¿Qué sucedió en el día de hoy?'}
                    label={'Título'}
                    minRows={5}
                    name={'body'}
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            {/* Botón para eliminar */}
            <Grid
                container
                justifyContent={'end'}
            >
                <Button
                    sx={{mt: 2}}
                    color={'error'}
                    onClick={onDelete}
                >
                    <DeleteOutline />
                    Eliminar
                </Button>
            </Grid>

            {/* Galería de imágenes */}
            <ImageGallery images={note.imageUrls} />

        </Grid>
    );
};

