import React, {SyntheticEvent, useState} from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid, IconButton,
    List,
    ListItem, ListItemSecondaryAction,
    ListItemText,
    makeStyles,
} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {makeQueryListSelector} from './selector/systemSchemaSelector';
import {Query} from './api/types';
import QueryPayloadForm from './pages/queries/QueryPayloadForm';
import MapIcon from '@material-ui/icons/Map';
import {Redirect, RouteComponentProps, withRouter} from 'react-router';
import * as Route from './routes';

interface QueriesPageParams {
    query?: string;
}

interface QueriesPageProps extends RouteComponentProps<QueriesPageParams> {}

const useStyles = makeStyles(() => ({
    queryText: {
        wordWrap: 'break-word',
    },
    queryTextWithMapLink: {
        wordWrap: 'break-word',
        paddingRight: '50px',
    },
    selectedQuery: {
        backgroundColor: 'rgba(0, 0, 0, 0.1) !important',
    },
}));

const QueriesPage = (props: QueriesPageProps) => {
    const classes = useStyles();
    const queries = useSelector(makeQueryListSelector());
    const [selectedQuery, setSelectedQuery] = useState<string|undefined>(props.match.params.query);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const selectedQueryObject = queries.find(query => query.queryName === selectedQuery);

    const handleChangeSelectedQuery = (queryName: string) => {
        setSelectedQuery(queryName);
        setShouldRedirect(true);
    };

    const handleEventMapClick = (e: SyntheticEvent, query: Query) => {
        e.preventDefault();

        window.open(query.eventMapLink, 'IIOEventMap');
    };

    if(shouldRedirect && props.match.params.query === selectedQuery) {
        setShouldRedirect(false);
    }

    return (
        <>
            {shouldRedirect && <Redirect to={Route.makeExecuteQueryPath(selectedQuery as string)} />}
            <Grid container={true} spacing={3}>
                <Grid item={true} md={3}>
                    <Card>
                        <CardHeader title={'Queries'} />
                        <Divider />
                        <CardContent>
                            <List>
                                {queries.map((query: Query) => (
                                    <ListItem
                                        key={query.queryName}
                                        button={true}
                                        className={query.queryName === selectedQuery ? classes.selectedQuery : ''}
                                        onClick={() => handleChangeSelectedQuery(query.queryName)}
                                    >
                                        <ListItemText
                                            primary={query.queryName}
                                            className={(query.eventMapLink? classes.queryTextWithMapLink : classes.queryText)} />
                                        {query.eventMapLink && <ListItemSecondaryAction>
                                            <IconButton onClick={e => handleEventMapClick(e, query)} title="show on event map">
                                                <MapIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>}
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item={true} md={9}>
                    {selectedQueryObject !== undefined && (
                        <QueryPayloadForm query={selectedQueryObject} />
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default withRouter(QueriesPage);
