import React, {useState} from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
} from '@material-ui/core';
import {Command} from './api/types';
import {useSelector} from 'react-redux';
import {makeCommandListSelector} from './selector/systemSchemaSelector';
import CommandCategoryExpansionPanel from './pages/commands/components/CommandCategoryExpansionPanel';
import CommandForm from './pages/commands/components/CommandForm';

const CommandsPage = () => {
    const commands = useSelector(makeCommandListSelector());
    const [selectedCommand, setSelectedCommand] = useState<string|undefined>(undefined);

    const categorizedCommands = commands.reduce(
        (accumulator: Record<string, Command[]>, command: Command) => {
            const category = command.aggregateType || 'Not Categorized';
            return { ...accumulator, [category]: [...(accumulator[category] || []), command] };
        },
        {}
    );

    const selectedCommandObject = commands.find(command => command.commandName === selectedCommand);

    return (
        <Grid container={true} spacing={3}>
            <Grid item={true} md={3}>
                <Card>
                    <CardHeader title={'Commands'} />
                    <Divider />
                    <CardContent>
                        {Object.keys(categorizedCommands).map(category => (
                            <CommandCategoryExpansionPanel
                                key={category}
                                category={category}
                                commandList={categorizedCommands[category]}
                                selectedCommand={selectedCommand}
                                onChangeSelectedCommand={setSelectedCommand}
                            />
                        ))}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item={true} md={9}>
                {selectedCommandObject && <CommandForm command={selectedCommandObject} />}
            </Grid>
        </Grid>
    );
};

export default CommandsPage;
