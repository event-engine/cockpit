import {Button, Collapse, List, ListItem, makeStyles} from '@material-ui/core';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {makeAggregateTypeListSelector, normalizeAggregateType} from '../selector/systemSchemaSelector';
import {NavLink} from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import MemoryIcon from '@material-ui/icons/Memory';
import BuildIcon from '@material-ui/icons/Build';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {commandsPath, dashboardPath, makeAggregateUrl, queriesPath} from '../routes';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        flex: 1,
    },
    item: {
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 0,
    },
    button: {
        color: theme.palette.secondary.main,
        padding: '10px 8px',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
        fontWeight: theme.typography.fontWeightMedium,
    },
    icon: {
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(1),
    },
    active: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
    },
}));

const SideBarContent = () => {

    const classes = useStyles();
    const [aggregatesOpen, setAggregatesOpen] = useState<boolean>(true);
    const aggregateList = useSelector(makeAggregateTypeListSelector());

    return (
        <List disablePadding={true} className={classes.root}>
            <ListItem className={classes.item} disableGutters={true}>
                <Button
                    activeClassName={classes.active}
                    className={classes.button}
                    component={NavLink}
                    to={dashboardPath}
                    children={(
                        <>
                            <div className={classes.icon}><DashboardIcon /></div>
                            Dashboard
                        </>
                    )}
                />
            </ListItem>
            <ListItem className={classes.item} disableGutters={true}>
                <Button
                    activeClassName={classes.active}
                    className={classes.button}
                    component={NavLink}
                    to={queriesPath}
                    children={(
                        <>
                            <div className={classes.icon}><LocationSearchingIcon /></div>
                            Queries
                        </>
                    )}
                />
            </ListItem>
            <ListItem className={classes.item} disableGutters={true}>
                <Button
                    activeClassName={classes.active}
                    className={classes.button}
                    component={NavLink}
                    to={commandsPath}
                    children={(
                        <>
                            <div className={classes.icon}><BuildIcon /></div>
                            Commands
                        </>
                    )}
                />
            </ListItem>
            <ListItem className={classes.item} disableGutters={true}>
                <div style={{ width: '100%' }}>
                    <Button
                        activeClassName={classes.active}
                        className={classes.button}
                        component={NavLink}
                        to={'/aggregates'}
                        onClick={(event: React.MouseEvent) => {
                            event.stopPropagation();
                            event.preventDefault();
                            setAggregatesOpen(!aggregatesOpen);
                        }}
                        children={(
                            <>
                                <div className={classes.icon}><MemoryIcon /></div>
                                Aggregates
                                {aggregatesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </>
                        )}
                    />
                    <Collapse in={aggregatesOpen} style={{ paddingLeft: '30px' }}>
                        <List disablePadding={true}>
                            {(aggregateList || []).map(
                                type => (
                                    <ListItem key={type} className={classes.item} disableGutters={true}>
                                        <Button
                                            activeClassName={classes.active}
                                            className={classes.button}
                                            component={NavLink}
                                            to={makeAggregateUrl(normalizeAggregateType(type))}
                                        >
                                            {type}
                                        </Button>
                                    </ListItem>
                                ),
                            )}
                        </List>
                    </Collapse>
                </div>
            </ListItem>
        </List>
    );
};

export default SideBarContent;
