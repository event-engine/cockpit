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
import {Redirect, RouteComponentProps, withRouter} from 'react-router';
import * as Route from './routes';

interface CommandsPageParams {
    command?: string;
}

interface CommandsPageProps extends RouteComponentProps<CommandsPageParams> {}

const CommandsPage = (props: CommandsPageProps) => {
    const commands = useSelector(makeCommandListSelector());

    const [selectedCommand, setSelectedCommand] = useState<string|undefined>(props.match.params.command);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const categorizedCommands = commands.reduce(
        (accumulator: Record<string, Command[]>, command: Command) => {
            const category = command.aggregateType || 'Not Categorized';
            return { ...accumulator, [category]: [...(accumulator[category] || []), command] };
        },
        {}
    );

    const handleChangeSelectedCommand = (newCommand: string) => {
        setSelectedCommand(newCommand);
        setShouldRedirect(true);
    };

    const selectedCommandObject = commands.find(command => command.commandName === selectedCommand);

    if(shouldRedirect && props.match.params.command === selectedCommand) {
        setShouldRedirect(false);
    }

    return (
        <>
            {shouldRedirect && <Redirect to={Route.makeExecuteCommandPath(selectedCommand as string)} />}
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
                                    onChangeSelectedCommand={handleChangeSelectedCommand}
                                />
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item={true} md={9}>
                    {selectedCommandObject && <CommandForm command={selectedCommandObject} />}
                </Grid>
            </Grid>
        </>
    );
};

export default withRouter(CommandsPage);
