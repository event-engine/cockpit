import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary, IconButton,
    List,
    ListItem,
    ListItemSecondaryAction, ListItemText,
    makeStyles,
} from '@material-ui/core';
import {Command} from '../../../api/types';
import React, {SyntheticEvent} from 'react';
import MapIcon from '@material-ui/icons/Map';

const useStyles = makeStyles(() => ({
    commandText: {
        wordWrap: 'break-word',
    },
    commandTextWithMapLink: {
        wordWrap: 'break-word',
        paddingRight: '50px',
    },
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

    const containsSelectedCommand = props.commandList.find(cmd => cmd.commandName === props.selectedCommand);

    const handleEventMapClick = (e: SyntheticEvent, command: Command) => {
        e.preventDefault();

        window.open(command.eventMapLink, 'IIOEventMap');
    };

    return (
        <ExpansionPanel defaultExpanded={!!containsSelectedCommand}>
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
                        >
                            <ListItemText
                                primary={command.commandName}
                                className={(command.eventMapLink? classes.commandTextWithMapLink : classes.commandText)} />
                            {command.eventMapLink && <ListItemSecondaryAction>
                                <IconButton onClick={e => handleEventMapClick(e, command)} title="show on event map">
                                    <MapIcon />
                                </IconButton>
                            </ListItemSecondaryAction>}
                        </ListItem>
                    ))}
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default CommandCategoryExpansionPanel;
