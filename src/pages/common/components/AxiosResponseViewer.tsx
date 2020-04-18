import React from 'react';
import {AxiosResponse} from 'axios';
import {Container, Box, makeStyles} from '@material-ui/core';
import Editor from '@monaco-editor/react';
import {useSelector} from 'react-redux';
import {makeThemeSelector} from '../../../selector/settingsSelector';

interface AxiosResponseViewerProps {
    response: AxiosResponse;
}

const useStyles = makeStyles(theme => ({
    headerContainer: {
        backgroundColor: theme.palette.background.default,
        padding: '10px',
    },
    headerBox: {
        paddingLeft: '10px',
        paddingRight: '10px',
    },
}));

const AxiosResponseViewer = (props: AxiosResponseViewerProps) => {

    const classes = useStyles();
    const theme = useSelector(makeThemeSelector());

    // @ts-ignore
    const requestTime = props.response.config.metadata.requestTime;

    return (
        <Container disableGutters={true}>
            <Container className={classes.headerContainer}>
                <Box component={'span'} className={classes.headerBox}>
                    Status: {props.response.status} {props.response.statusText}
                </Box>
                <Box component={'span'} className={classes.headerBox}>
                    Time: {requestTime} ms
                </Box>
            </Container>
            <Editor
                value={JSON.stringify(props.response.data, null, 2)}
                height={'450px'}
                language={'json'}
                theme={theme === 'light' ? 'light' : 'dark'}
                options={{
                    readOnly: true,
                    minimap: {
                        enabled: false,
                    },
                    scrollBeyondLastLine: false,
                }}
            />
        </Container>
    );
};

export default AxiosResponseViewer;
