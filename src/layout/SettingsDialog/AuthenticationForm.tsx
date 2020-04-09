import {FormControl, Grid, InputLabel, makeStyles, MenuItem, Select} from '@material-ui/core';
import React, {useState} from 'react';
import {config} from '../../config';

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
    const [authentication, setAuthentication] = useState<AuthenticationTypes>(
        config.authentication && Object.values(AuthenticationTypes).includes(config.authentication.type)
            ? config.authentication.type as AuthenticationTypes
            : AuthenticationTypes.none,
    );

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
                'tbd client credentials'
            )}
        </Grid>
    );
};

export default AuthenticationForm;
