import {FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {config} from '../../config';
import {useSelector} from 'react-redux';
import {makeAuthenticationSelector} from '../../selector/settingsSelector';

const useStyles = makeStyles(theme => ({
    authSelect: {
        width: '300px',
    },
}));

export enum AuthenticationTypes {
    none = 'none',
    oauth2PasswordGrant = 'oauth2_password',
    oAuth2ClientCredentialsGrant = 'oauth2_client_credentials',
}

interface AuthenticationFormProps {

}

const AuthenticationForm = (props: AuthenticationFormProps) => {
    const classes = useStyles();
    const currentAuthentication = useSelector(makeAuthenticationSelector());

    const [authentication, setAuthentication] = useState<AuthenticationTypes>(
        config.authentication && Object.values(AuthenticationTypes).includes(config.authentication.type)
            ? config.authentication.type as AuthenticationTypes
            : AuthenticationTypes.none,
    );
    const [url, setUrl] = useState<string>('');
    const [clientId, setClientId] = useState<string>('');
    const [clientSecret, setClientSecret] = useState<string>('');

    useEffect(() => {
        if (!currentAuthentication) {
            setAuthentication(AuthenticationTypes.none);
            return;
        }

        setUrl(currentAuthentication.url);
        if (currentAuthentication.type === AuthenticationTypes.oAuth2ClientCredentialsGrant) {
            setClientId(currentAuthentication.clientId);
            setClientSecret(currentAuthentication.clientSecret);
        }
    }, [currentAuthentication]);

    return (
        <Grid container={true} spacing={3} style={{ marginTop: '20px' }}>
            <Grid item={true} md={12}>
                <FormControl variant={'outlined'} className={classes.authSelect}>
                    <InputLabel id={'auth-select-label'}>Authentication</InputLabel>
                    <Select
                        labelId={'auth-select-label'}
                        label={'Authentication'}
                        value={authentication}
                        onChange={(event: React.ChangeEvent<any>) => setAuthentication(event.target.value)}
                    >
                        <MenuItem value={AuthenticationTypes.none}>None</MenuItem>
                        <MenuItem value={AuthenticationTypes.oauth2PasswordGrant}>OAuth2 Password Grant</MenuItem>
                        <MenuItem value={AuthenticationTypes.oAuth2ClientCredentialsGrant}>OAuth2 Client Credentials Grant</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            {authentication === AuthenticationTypes.oauth2PasswordGrant && (
                'tbd password'
            )}
            {authentication === AuthenticationTypes.oAuth2ClientCredentialsGrant && (
                <Grid item={true} md={12}>
                    <TextField
                        label={'Url'}
                        variant={'outlined'}
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />
                    <TextField
                        label={'Client Id'}
                        variant={'outlined'}
                        value={clientId}
                        onChange={e => setClientId(e.target.value)}
                    />
                    <TextField
                        label={'Client Secret'}
                        variant={'outlined'}
                        value={clientSecret}
                        onChange={e => setClientSecret(e.target.value)}
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default AuthenticationForm;
