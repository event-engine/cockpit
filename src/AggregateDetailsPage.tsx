import React from 'react';
import {Grid} from '@material-ui/core';
import AggregateDetailsEventsWidget from './pages/aggregateDetails/components/AggregateDetailsEventsWidget';
import {RouteComponentProps} from 'react-router';
import AggregateStateView from './pages/aggregateDetails/components/AggregateStateView';

interface AggregateDetailsPageProps extends RouteComponentProps {

}

const AggregateDetailsPage = (props: AggregateDetailsPageProps) => {

    const aggregateType = (props.match.params as any).aggregateType;
    const aggregateId = (props.match.params as any).aggregateId;

    return (
        <Grid container={true} spacing={3}>
            <Grid item={true} md={6}>
                <AggregateStateView aggregateType={aggregateType} aggregateId={aggregateId} />
            </Grid>
            <Grid item={true} md={6}>
                <AggregateDetailsEventsWidget/>
            </Grid>
        </Grid>
    );
};

export default AggregateDetailsPage;
