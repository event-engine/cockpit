import React from 'react';
import { Card, CardHeader, CardContent, Divider, Button } from '@material-ui/core';
import {useSelector} from "react-redux";
import {makeAggregateCreationCommandsSelector} from "../../../selector/eventEngineSchemaSelector";
import AddIcon from '@material-ui/icons/Add';

interface AggregateListProps {
    aggregateType: string;
}

const AggregateListWidget = (props: AggregateListProps) => {

    const commands = useSelector(makeAggregateCreationCommandsSelector(props.aggregateType));

    return (
        <Card>
            <CardHeader title={'Aggregates'} />
            <Divider />
            <CardContent>
                {commands && commands.length > 0 && (
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        startIcon={<AddIcon />}
                        children={commands[0].commandName}
                        style={{ textTransform: 'none' }}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default AggregateListWidget;
