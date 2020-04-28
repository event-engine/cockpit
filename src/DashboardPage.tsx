import React from 'react';
import {Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const DashboardPage = () => {
    return (

        <Grid container spacing={10}>
            <Grid item={true} xs={12}>
                <Typography variant={'h2'}>
                    Welcome to Event Engine Cockpit!
                </Typography>
            </Grid>
            <Grid item={true} xs={12}>
                <div>
                    This project is still under heavy development and it is very likely that there are quite a few bugs, many features to be
                    implemented and lots of sharp edges to be smoothed out. We have a lot of ideas about what features we want to implement
                    next and we would also appreciate feedback from you! Therefore, if you feel like something is missing or not working as
                    nicely as you would expect it to, please open an
                    <a href="https://github.com/event-engine/cockpit/issues" target="_blank" rel="noopener noreferrer">issue</a>  or create a
                    <a href="" target="_blank" rel="noopener noreferrer">pull request</a>.
                </div>
            </Grid>
        </Grid>
    );
};

export default DashboardPage;
