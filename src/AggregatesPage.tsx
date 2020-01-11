import React, {useEffect} from 'react';
import {RouteComponentProps} from 'react-router';
import {Grid} from '@material-ui/core';
import AggregateEventsWidget from './pages/aggregates/components/AggregateEventsWidget';
import AggregateListWidget from './pages/aggregates/components/AggregateListWidget';

interface AggregatesPageProps extends RouteComponentProps {

}

const AggregatesPage = (props: AggregatesPageProps) => {

    const type = (props.match.params as any).aggregate;

    useEffect(() => {
        console.log('effect!');
    }, [type]);

    return (
        <Grid container={true} spacing={3}>
            <Grid item={true} md={8}>
                <AggregateListWidget aggregateType={type} />
            </Grid>
            <Grid item={true} md={4}>
                <AggregateEventsWidget aggregateType={type} />
            </Grid>
        </Grid>
    );
};

export default AggregatesPage;
