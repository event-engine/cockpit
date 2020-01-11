import React, {useEffect, useState} from 'react';
import {Card, CardHeader, CardContent, Divider, Button, Dialog, DialogTitle, DialogActions, DialogContent} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {
    makeAggregateCreationCommandsSelector,
    makeAggregateIdentifierSelector, makeRawAggregateTypeSelector,
} from '../../../selector/eventEngineSchemaSelector';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import {loadAggregatesForType} from '../../../api';
import {updateAggregateList} from '../../../reducer/aggregateDataReducer';
import {makeAggregateListSelector} from '../../../selector/aggregateDataSelector';
import AggregateExpansionPanel from './AggregateExpansionPanel';
import {Command} from '../../../api/types';
import CommandForm from '../../common/components/CommandForm';

interface AggregateListProps {
    aggregateType: string;
}

const AggregateListWidget = (props: AggregateListProps) => {

    const commands = useSelector(makeAggregateCreationCommandsSelector(props.aggregateType));
    const aggregateList = useSelector(makeAggregateListSelector(props.aggregateType));
    const aggregateIdentifier = useSelector(makeAggregateIdentifierSelector(props.aggregateType));
    const rawAggregateType = useSelector(makeRawAggregateTypeSelector(props.aggregateType));
    const dispatch = useDispatch();
    const [commandDialogOpen, setCommandDialogOpen] = useState<boolean>(false);
    const [commandDialogCommand, setCommandDialogCommand] = useState<Command|null>(null);

    useEffect(() => {
        if (!rawAggregateType) {
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
                        onClick={() => openDialogForCommand(command)}
                    />
                ))}

                {commandDialogCommand !== null && (
                    <Dialog open={commandDialogOpen} onClose={() => setCommandDialogOpen(false)} fullWidth={true}>
                        <DialogTitle>{commandDialogCommand.commandName}</DialogTitle>
                        <Divider />
                        <DialogContent>
                            <CommandForm command={commandDialogCommand} />
                        </DialogContent>
                        <Divider />
                        <DialogActions>
                            <Button
                                variant={'contained'}
                                color={'primary'}
                                startIcon={<SendIcon />}
                                children={'Execute ' + commandDialogCommand.commandName}
                                style={{ textTransform: 'none', margin: '5px' }}
                            />
                        </DialogActions>
                    </Dialog>
                )}
            </CardContent>
        </Card>
    );
};

export default AggregateListWidget;
