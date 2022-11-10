import {CircularProgress, Grid} from "@mui/material";

export const CheckingAuth = () => {
    return (
        <Grid
            container
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
                minHeight: '100vh',
                backgroundColor: 'primary.main',
                padding: 4
            }}
        >
            <CircularProgress color={'warning'} />
        </Grid>
    );
};