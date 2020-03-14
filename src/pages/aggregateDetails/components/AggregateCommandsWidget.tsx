import {Card, CardContent, CardHeader, Divider} from '@material-ui/core';
import React from 'react';
import {useSelector} from 'react-redux';
import {makeAggregateNonCreationCommandsSelector} from '../../../selector/eventEngineSchemaSelector';
import CommandButton from '../../common/components/CommandButton';
import {Alert, AlertTitle} from '@material-ui/lab';

interface AggregateCommandsWidgetProps {
    aggregateType: string;
}

const AggregateCommandsWidget = (props: AggregateCommandsWidgetProps) => {
    const commands = useSelector(makeAggregateNonCreationCommandsSelector(props.aggregateType));

    if (!commands) {
        return null;
    }

    return (
        <Card>
            <CardHeader
                title={'Aggregate Commands'}
            />
            <Divider />
            <CardContent>
                {commands.length === 0 && (
                    <Alert severity={'info'}>
                        <AlertTitle>Info</AlertTitle>
                        This aggregate type does not have any commands configured for altering an existing aggregate.
                    </Alert>
                )}
                {commands.map(command => (
                    <CommandButton key={command.commandName} command={command} onClick={() => { /* Command form */ }}/>
                ))}
            </CardContent>
        </Card>
    );
};

export default AggregateCommandsWidget;
