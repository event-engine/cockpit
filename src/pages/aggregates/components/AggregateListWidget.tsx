import React, {useEffect, useState} from 'react';
import {Card, CardHeader, CardContent, Divider, Button, Dialog, DialogTitle, DialogActions, DialogContent, Typography} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {
    makeAggregateCreationCommandsSelector,
    makeAggregateIdentifierSelector, makeAggregateMultiStoreModeSelector, makeRawAggregateTypeSelector,
} from '../../../selector/eventEngineSchemaSelector';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import {executeCommand, loadAggregatesForType} from '../../../api';
import {updateAggregateList} from '../../../reducer/aggregateDataReducer';
import {makeAggregateListSelector} from '../../../selector/aggregateDataSelector';
import AggregateExpansionPanel from './AggregateExpansionPanel';
import {Command, MultiStoreMode} from '../../../api/types';
import CommandForm from '../../common/components/CommandForm';

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

        loadAggregatesForType(rawAggregateType).then(newAggregateList => {
            dispatch(updateAggregateList({ aggregateType: props.aggregateType, aggregateList: newAggregateList }));
        });
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
                    <Typography variant={'body1'}>
                         There is no aggregate state available since your Multi-Model-Store is operating in events only mode.
                    </Typography>
                )}

                {commands && commands.length > 0 && commands.map(command => (
                    <Button
                        key={command.commandName}
                        variant={'contained'}
                        color={'primary'}
                        startIcon={<AddIcon />}
                        children={command.commandName}
                        style={{ textTransform: 'none', margin: '5px' }}
                        onClick={() => openDialogForCommand(command)}
                    />
                ))}

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
            </CardContent>
        </Card>
    );
};

export default AggregateListWidget;
