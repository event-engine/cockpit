import {Card, CardContent, CardHeader, Divider} from '@material-ui/core';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {
    makeAggregateIdentifierSelector,
    makeAggregateNonCreationCommandsSelector,
} from '../../../selector/systemSchemaSelector';
import CommandButton from '../../common/components/CommandButton';
import {Alert, AlertTitle} from '@material-ui/lab';
import {Command} from '../../../api/types';
import CommandDialog from '../../common/components/CommandDialog';

interface AggregateCommandsWidgetProps {
    aggregateType: string;
    aggregateId: string;
    onCommandExecuted?: () => void;
}

const AggregateCommandsWidget = (props: AggregateCommandsWidgetProps) => {
    const commands = useSelector(makeAggregateNonCreationCommandsSelector(props.aggregateType));
    let identifier = useSelector(makeAggregateIdentifierSelector(props.aggregateType));
    const [commandDialogCommand, setCommandDialogCommand] = useState<Command|null>(null);

    if (!commands) {
        return null;
    }

    if(!identifier) {
        identifier = 'id';
    }

    const handleCommandDialogClosed = () => {
        setCommandDialogCommand(null);
        props.onCommandExecuted && props.onCommandExecuted();
    };

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
                    <CommandButton
                        key={command.commandName}
                        command={command}
                        onClick={() => setCommandDialogCommand(command)}
                    />
                ))}
            </CardContent>

            {commandDialogCommand !== null && (
                <CommandDialog
                    open={commandDialogCommand !== null}
                    onClose={handleCommandDialogClosed}
                    commandDialogCommand={commandDialogCommand}
                    aggregateIdentifier={{identifier, value: props.aggregateId}}
                />
            )}
        </Card>
    );
};

export default AggregateCommandsWidget;
