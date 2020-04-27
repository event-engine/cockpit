import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    List,
    ListItem,
    ListItemText, makeStyles,
} from '@material-ui/core';
import {Command} from '../../../api/types';
import React from 'react';

const useStyles = makeStyles(() => ({
    selectedCommand: {
        backgroundColor: 'rgba(0, 0, 0, 0.1) !important',
    },
    list: {
        width: '100%',
    },
}));

interface CommandCategoryExpansionPanelProps {
    category: string;
    commandList: Command[];
    selectedCommand: string|undefined;
    onChangeSelectedCommand: (commandName: string) => void;
}

const CommandCategoryExpansionPanel = (props: CommandCategoryExpansionPanelProps) => {
    const classes = useStyles();

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary>
                {props.category}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <List className={classes.list}>
                    {props.commandList.map((command: Command) => (
                        <ListItem
                            key={command.commandName}
                            button={true}
                            className={command.commandName === props.selectedCommand ? classes.selectedCommand : ''}
                            onClick={() => props.onChangeSelectedCommand(command.commandName)}
                            children={<ListItemText primary={command.commandName} />}
                        />
                    ))}
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default CommandCategoryExpansionPanel;
