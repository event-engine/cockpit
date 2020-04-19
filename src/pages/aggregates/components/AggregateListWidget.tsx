import React, {useEffect, useRef, useState} from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    IconButton,
    makeStyles,
} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {
    makeAggregateCreationCommandsSelector,
    makeAggregateIdentifierSelector, makeAggregateMultiStoreModeSelector, makeRawAggregateTypeSelector,
} from '../../../selector/systemSchemaSelector';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {executeCommand} from '../../../api';
import {makeAggregateListSelector} from '../../../selector/aggregateDataSelector';
import AggregateExpansionPanel from './AggregateExpansionPanel';
import {Command, MultiStoreMode} from '../../../api/types';
import CommandForm from '../../common/components/CommandForm';
import {Alert, AlertTitle} from '@material-ui/lab';
import CommandButton from '../../common/components/CommandButton';
import {fetchAggregateList} from '../../../action/aggregateDataCommands';
import {defaultEeUiConfig} from '../../../defaultEeUIConfig';

interface AggregateListProps {
    aggregateType: string;
}

const useStyles = makeStyles(theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

const AggregateListWidget = (props: AggregateListProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const commands = useSelector(makeAggregateCreationCommandsSelector(props.aggregateType));
    const aggregateList = useSelector(makeAggregateListSelector(props.aggregateType));
    const aggregateIdentifier = useSelector(makeAggregateIdentifierSelector(props.aggregateType));
    const rawAggregateType = useSelector(makeRawAggregateTypeSelector(props.aggregateType));
    const multiStoreMode = useSelector(makeAggregateMultiStoreModeSelector(props.aggregateType));
    const [shownAggregateCount, setShownAggregateCount] = useState<number>(defaultEeUiConfig.env.aggregateList.batchSize);
    const [commandDialogOpen, setCommandDialogOpen] = useState<boolean>(false);
    const [commandDialogCommand, setCommandDialogCommand] = useState<Command|null>(null);
    const commandFormRef = useRef();

    useEffect(() => {
        if (!rawAggregateType || multiStoreMode === MultiStoreMode.Event) {
            return;
        }

        dispatch(fetchAggregateList({ rawAggregateType }));
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [props.aggregateType, rawAggregateType]);

    const openDialogForCommand = (command: Command) => {
        setCommandDialogCommand(command);
        setCommandDialogOpen(true);
    };

    const handleExecuteCommand = () => {
        if (!commandDialogCommand) {
            return;
        }

        const payload = (commandFormRef.current as any).retrievePayload();
        executeCommand(commandDialogCommand.commandName, payload);
    };

    return (
        <Card>
            <CardHeader title={'Aggregates'} />
            <Divider />
            <CardContent>
                {aggregateList && aggregateIdentifier && aggregateList
                    .slice(0, shownAggregateCount)
                    .map((aggregate: any, index: number) => (
                        <AggregateExpansionPanel
                            key={index}
                            aggregate={aggregate}
                            aggregateType={props.aggregateType}
                            aggregateIdentifier={aggregateIdentifier}
                        />
                    ))
                }

                {aggregateList && shownAggregateCount < aggregateList.length && (
                    <IconButton
                        style={{ display: 'block', margin: '0 auto' }}
                        onClick={() => setShownAggregateCount(shownAggregateCount + defaultEeUiConfig.env.aggregateList.batchSize)}
                        title={'Show More'}
                        children={<ExpandMoreIcon />}
                    />
                )}

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
                <Dialog open={commandDialogOpen} fullWidth={true} maxWidth={'lg'}>
                    <DialogTitle>
                        {commandDialogCommand.commandName}
                        <IconButton className={classes.closeButton} onClick={() => setCommandDialogOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <Divider />
                    <DialogContent style={{ padding: '24px 24px' }}>
                        <CommandForm
                            command={commandDialogCommand}
                            ref={commandFormRef}
                        />
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button
                            children={'Cancel'}
                            onClick={() => setCommandDialogOpen(false)}
                            color={'secondary'}
                        />
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
