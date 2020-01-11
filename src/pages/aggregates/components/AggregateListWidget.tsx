import React, {useEffect} from 'react';
import { Card, CardHeader, CardContent, Divider, Button } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {
    makeAggregateCreationCommandsSelector,
    makeAggregateIdentifierSelector, makeRawAggregateTypeSelector,
} from '../../../selector/eventEngineSchemaSelector';
import AddIcon from '@material-ui/icons/Add';
import {loadAggregatesForType} from '../../../api';
import {updateAggregateList} from '../../../reducer/aggregateDataReducer';
import {makeAggregateListSelector} from '../../../selector/aggregateDataSelector';
import AggregateExpansionPanel from './AggregateExpansionPanel';

interface AggregateListProps {
    aggregateType: string;
}

const AggregateListWidget = (props: AggregateListProps) => {

    const commands = useSelector(makeAggregateCreationCommandsSelector(props.aggregateType));
    const aggregateList = useSelector(makeAggregateListSelector(props.aggregateType));
    const aggregateIdentifier = useSelector(makeAggregateIdentifierSelector(props.aggregateType));
    const rawAggregateType = useSelector(makeRawAggregateTypeSelector(props.aggregateType));
    const dispatch = useDispatch();

    useEffect(() => {
        if (!rawAggregateType) {
            return;
        }

        loadAggregatesForType(rawAggregateType).then(newAggregateList => {
            dispatch(updateAggregateList({ aggregateType: props.aggregateType, aggregateList: newAggregateList }));
        });
    }, [props.aggregateType, rawAggregateType]);

    return (
        <Card>
            <CardHeader title={'Aggregates'} />
            <Divider />
            <CardContent>
                {aggregateList && aggregateIdentifier && aggregateList.map((aggregate: any, index: number) => (
                    <AggregateExpansionPanel key={index} aggregate={aggregate} aggregateIdentifier={aggregateIdentifier} />
                ))}

                {commands && commands.length > 0 && commands.map(command => (
                    <Button
                        key={command.commandName}
                        variant={'contained'}
                        color={'primary'}
                        startIcon={<AddIcon />}
                        children={command.commandName}
                        style={{ textTransform: 'none', margin: '5px' }}
                    />
                ))}
            </CardContent>
        </Card>
    );
};

export default AggregateListWidget;
