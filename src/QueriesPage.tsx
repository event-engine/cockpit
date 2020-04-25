import React, {useState} from 'react';
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    Divider,
    List,
    ListItem,
    ListItemText,
    makeStyles,
} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {makeQueryListSelector} from './selector/systemSchemaSelector';
import {Query} from './api/types';
import QueryPayloadForm from './pages/queries/QueryPayloadForm';

const useStyles = makeStyles(() => ({
    selectedQuery: {
        backgroundColor: 'rgba(0, 0, 0, 0.1) !important',
    },
}));

const QueriesPage = () => {
    const classes = useStyles();
    const queries = useSelector(makeQueryListSelector());
    const [selectedQuery, setSelectedQuery] = useState<number|undefined>(undefined);

    return (
        <Grid container={true} spacing={3}>
            <Grid item={true} md={3}>
                <Card>
                    <CardHeader title={'Queries'} />
                    <Divider />
                    <CardContent>
                        <List>
                            {queries.map((query: Query, index: number) => (
                                <ListItem
                                    key={query.queryName}
                                    button={true}
                                    className={index === selectedQuery ? classes.selectedQuery : ''}
                                    onClick={() => setSelectedQuery(index)}
                                    children={<ListItemText primary={query.queryName} />}
                                />
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item={true} md={9}>
                {selectedQuery !== undefined && (
                    <QueryPayloadForm query={queries[selectedQuery]} />
                )}
            </Grid>
        </Grid>
    );
};

export default QueriesPage;
