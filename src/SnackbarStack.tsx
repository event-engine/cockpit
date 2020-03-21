import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeCurrentSnackbarSelector} from './selector/snackbarSelector';
import { Snackbar as MuiSnackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {snackbarDequeued} from './action/snackbarEvents';
import { Snackbar } from './reducer/snackbarReducer';

const SnackbarStack = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<Snackbar|undefined>();
    const currentSnackbar = useSelector(makeCurrentSnackbarSelector());

    useEffect(() => {
        setOpen(false);

        setTimeout(
            () => {
                setOpen(true);
                setSnackbar(currentSnackbar || undefined);
            },
            snackbar ? 200 : 1,
        );
    }, [currentSnackbar]);

    const handleClose = (event: React.SyntheticEvent, reason?: string) => {
        if (!snackbar || reason === 'clickaway') {
            return;
        }

        dispatch(snackbarDequeued({ id: snackbar.id }));
    };

    return !snackbar ? null : (
        <MuiSnackbar
            open={open}
            autoHideDuration={snackbar.autoHideDuration}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
            children={(
                <Alert
                    elevation={6}
                    variant={'filled'}
                    onClose={handleClose}
                    severity={snackbar.severity}
                    children={snackbar.message}
                />
            )}
        />
    );
};

export default SnackbarStack;
