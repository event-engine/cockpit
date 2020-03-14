import {Button} from '@material-ui/core';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import {Command} from '../../../api/types';

interface CommandButtonProps {
    command: Command;
    onClick: () => void;
}

const CommandButton = (props: CommandButtonProps) => {
    return (
        <Button
            key={props.command.commandName}
            variant={'contained'}
            color={'primary'}
            startIcon={props.command.createAggregate ? <AddIcon /> : undefined}
            children={props.command.commandName}
            style={{ textTransform: 'none', margin: '5px' }}
            onClick={props.onClick}
        />
    );
};

export default CommandButton;
