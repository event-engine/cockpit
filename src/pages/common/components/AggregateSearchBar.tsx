import {Divider, IconButton, InputBase, Paper, TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {
    makeAggregateTypeListSelector,
    makeRawAggregateTypeSelector,
    normalizeAggregateType,
} from '../../../selector/systemSchemaSelector';
import {enqueueWarningSnackbar} from '../../../action/snackbarCommands';
import {useHistory} from 'react-router';
import {makeAggregateDetailsUrl} from '../../../routes';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 'calc(100% - 8px)',
    },
    input: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

interface AggregateSearchBarProps {
    aggregateType: string;
    aggregateId?: string;
}

const AggregateSearchBar = (props: AggregateSearchBarProps) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [aggregateType, setAggregateType] = useState<string|null>(null);
    const [aggregateId, setAggregateId] = useState<string>('');
    const aggregateList = useSelector(makeAggregateTypeListSelector());
    const rawAggregateType = useSelector(makeRawAggregateTypeSelector(props.aggregateType));

    useEffect(
        () => setAggregateType(rawAggregateType),
        [rawAggregateType],
    );

    useEffect(
        () => setAggregateId(props.aggregateId || ''),
        [props.aggregateId],
    );

    const triggerSearch = () => {
        if (!aggregateType || aggregateId.length < 1) {
            dispatch(enqueueWarningSnackbar({
                message: 'Please specify aggregate type and aggregate id',
            }));

            return;
        }

        history.push(makeAggregateDetailsUrl(normalizeAggregateType(aggregateType!), aggregateId));
    };

    return (
        <Paper className={classes.root}>
            <Autocomplete
                options={aggregateList || []}
                style={{ width: 300 }}
                value={aggregateType}
                onChange={(event: React.ChangeEvent<{}>, newValue: null|string) => setAggregateType(newValue)}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant={'outlined'}
                        size={'small'}
                    />
                )}
            />
            <InputBase
                className={classes.input}
                placeholder={'Find by aggregate id'}
                value={aggregateId}
                onChange={event => setAggregateId(event.target.value)}
                onKeyUp={event => event.keyCode === 13 && triggerSearch()}
            />
            <Divider className={classes.divider} orientation={'vertical'} />
            <IconButton className={classes.iconButton} onClick={triggerSearch}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default AggregateSearchBar;
