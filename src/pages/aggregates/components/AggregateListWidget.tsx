import React, {useEffect, useState} from 'react';
import {Card, CardHeader, CardContent, CardActions, Divider, Button, Dialog, DialogTitle, DialogActions, DialogContent} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {
    makeAggregateCreationCommandsSelector,
    makeAggregateIdentifierSelector, makeAggregateMultiStoreModeSelector, makeRawAggregateTypeSelector,
} from '../../../selector/systemSchemaSelector';
import SendIcon from '@material-ui/icons/Send';
import {executeCommand} from '../../../api';
import {makeAggregateListSelector} from '../../../selector/aggregateDataSelector';
import AggregateExpansionPanel from './AggregateExpansionPanel';
import {Command, MultiStoreMode} from '../../../api/types';
import CommandForm from '../../common/components/CommandForm';
import {Alert, AlertTitle} from '@material-ui/lab';
import CommandButton from '../../common/components/CommandButton';
import {fetchAggregateList} from '../../../action/aggregateDataCommands';

interface AggregateListProps {
    aggregateType: string;
}

const AggregateListWidget = (props: AggregateListProps) => {

    const commands = useSelector(makeAggregateCreationCommandsSelector(props.aggregateType));
    const aggregateList = useSelector(makeAggregateListSelector(props.aggregateType));
    const aggregateIdentifier = useSelector(makeAggregateIdentifierSelector(props.aggregateType));
    const rawAggregateType = useSelector(makeRawAggregateTypeSelector(props.aggregateType));
    const multiStoreMode = useSelector(makeAggregateMultiStoreModeSelector(props.aggregateType));
    const dispatch = useDispatch();
    const [commandDialogOpen, setCommandDialogOpen] = useState<boolean>(false);
    const [commandDialogCommand, setCommandDialogCommand] = useState<Command|null>(null);
    const [commandPayload, setCommandPayload] = useState<any>({});

    useEffect(() => {
        if (!rawAggregateType || multiStoreMode === MultiStoreMode.Event) {
            return;
        }

        dispatch(fetchAggregateList({ rawAggregateType }));
    }, [props.aggregateType, rawAggregateType]);

    const openDialogForCommand = (command: Command) => {
        setCommandDialogCommand(command);
        setCommandDialogOpen(true);
    };

    const handleExecuteCommand = () => {
        if (!commandDialogCommand) {
            return;
        }

        executeCommand(commandDialogCommand.commandName, commandPayload);
    };

    return (
        <Card>
            <CardHeader title={'Aggregates'} />
            <Divider />
            <CardContent>
                {aggregateList && aggregateIdentifier && aggregateList.map((aggregate: any, index: number) => (
                    <AggregateExpansionPanel
                        key={index}
                        aggregate={aggregate}
                        aggregateType={props.aggregateType}
                        aggregateIdentifier={aggregateIdentifier}
                    />
                ))}

                {multiStoreMode === MultiStoreMode.Event && (
                    <Alert severity={'info'}>
                        <AlertTitle>Info</AlertTitle>
                        Event-Engine is operating in events-only mode for this type of aggregate, meaning that the
                        aggregate state is not persisted and therefore not available without replaying the events.
                    </Alert>
                )}
            </CardContent>
            <Divider />
            <CardActions>
                {commands && commands.length > 0 && commands.map(command => (
                    <CommandButton
                        key={command.commandName}
                        command={command}
                        onClick={() => openDialogForCommand(command)}
                    />
                ))}
            </CardActions>
            {commandDialogCommand !== null && (
                <Dialog open={commandDialogOpen} onClose={() => setCommandDialogOpen(false)} fullWidth={true} maxWidth={'lg'}>
                    <DialogTitle>{commandDialogCommand.commandName}</DialogTitle>
                    <Divider />
                    <DialogContent style={{ padding: '24px 24px' }}>
                        <CommandForm
                            command={commandDialogCommand}
                            payload={commandPayload}
                            onChangePayload={payload => setCommandPayload(payload)}
                        />
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            startIcon={<SendIcon />}
                            children={'Execute ' + commandDialogCommand.commandName}
                            style={{ textTransform: 'none', margin: '5px' }}
                            onClick={handleExecuteCommand}
                        />
                    </DialogActions>
                </Dialog>
            )}
        </Card>
    );
};

export default AggregateListWidget;
