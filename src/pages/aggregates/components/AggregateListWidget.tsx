import React, {useEffect, useState} from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {
    makeAggregateCreationCommandsSelector,
    makeAggregateIdentifierSelector, makeAggregateMultiStoreModeSelector, makeRawAggregateTypeSelector,
} from '../../../selector/systemSchemaSelector';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeAggregateListSelector} from '../../../selector/aggregateDataSelector';
import AggregateExpansionPanel from './AggregateExpansionPanel';
import {Command, MultiStoreMode} from '../../../api/types';
import {Alert, AlertTitle} from '@material-ui/lab';
import CommandButton from '../../common/components/CommandButton';
import {fetchAggregateList} from '../../../action/aggregateDataCommands';
import {defaultEeUiConfig} from '../../../defaultEeUIConfig';
import CommandDialog from '../../common/components/CommandDialog';

interface AggregateListProps {
    aggregateType: string;
}

const AggregateListWidget = (props: AggregateListProps) => {
    const dispatch = useDispatch();
    const commands = useSelector(makeAggregateCreationCommandsSelector(props.aggregateType));
    const aggregateList = useSelector(makeAggregateListSelector(props.aggregateType));
    const aggregateIdentifier = useSelector(makeAggregateIdentifierSelector(props.aggregateType));
    const rawAggregateType = useSelector(makeRawAggregateTypeSelector(props.aggregateType));
    const multiStoreMode = useSelector(makeAggregateMultiStoreModeSelector(props.aggregateType));
    const [shownAggregateCount, setShownAggregateCount] = useState<number>(defaultEeUiConfig.env.aggregateList.batchSize);
    const [commandDialogOpen, setCommandDialogOpen] = useState<boolean>(false);
    const [commandDialogCommand, setCommandDialogCommand] = useState<Command|null>(null);

    useEffect(() => {
        if (!rawAggregateType || multiStoreMode === MultiStoreMode.Event) {
            return;
        }

        if (commandDialogOpen) {
            return;
        }

        dispatch(fetchAggregateList({ rawAggregateType }));
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [props.aggregateType, rawAggregateType, commandDialogOpen]);

    const openDialogForCommand = (command: Command) => {
        setCommandDialogCommand(command);
        setCommandDialogOpen(true);
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
                <CommandDialog
                    open={commandDialogOpen}
                    onClose={() => setCommandDialogOpen(false)}
                    commandDialogCommand={commandDialogCommand}
                />
            )}
        </Card>
    );
};

export default AggregateListWidget;
