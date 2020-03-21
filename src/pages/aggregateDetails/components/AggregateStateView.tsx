import React, {useEffect} from 'react';
import {
    Card, CardContent, CardHeader, Divider,
    makeStyles,
} from '@material-ui/core';
import {loadAggregateState} from '../../../api';
import {updateAggregateState} from '../../../reducer/aggregateDataReducer';
import {useDispatch, useSelector} from 'react-redux';
import {makeRawAggregateTypeSelector} from '../../../selector/systemSchemaSelector';
import {makeAggregateStateSelector} from '../../../selector/aggregateDataSelector';
import JsonTree from '../../aggregates/components/JsonTree';

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
            loadAggregateState(rawAggregateType, props.aggregateId, props.version).then(aggregateState => {
                dispatch(updateAggregateState({ aggregateId: props.aggregateId, aggregateState }));
            });
        }
    }, [rawAggregateType, props.aggregateId, props.version]);

    const subheader = props.version ? `Aggregate state at version ${props.version}` : 'Latest aggregate state';

    return (
        <Card>
            <CardHeader title={'Aggregate State'} subheader={subheader} />
            <Divider />
            <CardContent>
                <JsonTree data={aggregate} />
            </CardContent>
        </Card>
    );
};

export default AggregateStateView;
