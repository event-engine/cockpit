import React, {useEffect} from 'react';
import {
    Card, CardContent, CardHeader, Divider,
    makeStyles,
} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {makeRawAggregateTypeSelector} from '../../../selector/systemSchemaSelector';
import {makeAggregateStateSelector} from '../../../selector/aggregateDataSelector';
import JsonTree from '../../aggregates/components/JsonTree';
import {fetchAggregateState} from '../../../action/aggregateDataCommands';
import LoadingCard from '../../common/components/LoadingCard';

const useStyles = makeStyles(theme => ({
}));

interface AggregateStateViewProps {
    aggregateType: string;
    aggregateId: string;
    version?: number|undefined;
}

const AggregateStateView = (props: AggregateStateViewProps) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const rawAggregateType = useSelector(makeRawAggregateTypeSelector(props.aggregateType));
    const aggregate = useSelector(makeAggregateStateSelector(props.aggregateId));

    useEffect(() => {
        if (rawAggregateType) {
            dispatch(fetchAggregateState({ rawAggregateType, aggregateId: props.aggregateId, version: props.version}));
        }
    }, [rawAggregateType, props.aggregateId, props.version]);

    const subheader = props.version ? `Aggregate state at version ${props.version}` : 'Latest aggregate state';

    return (
        <LoadingCard loading={!aggregate}>
            <CardHeader title={'Aggregate State'} subheader={subheader} />
            <Divider />
            <CardContent>
                <JsonTree data={aggregate || {}} />
            </CardContent>
        </LoadingCard>
    );
};

export default AggregateStateView;
