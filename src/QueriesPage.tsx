import React, {useState} from 'react';
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
                                        <ListItemText primary={query.queryName} />
                                        {query.eventMapLink && <ListItemSecondaryAction>
                                            <a href={query.eventMapLink} target="_blank" rel="noopener noreferrer" title="show on event map">
                                                <IconButton>
                                                    <MapIcon />
                                                </IconButton>
                                            </a>
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
