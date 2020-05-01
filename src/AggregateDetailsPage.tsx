import React, {useState} from 'react';
import {Grid} from '@material-ui/core';
import AggregateDetailsEventsWidget from './pages/aggregateDetails/components/AggregateDetailsEventsWidget';
import {RouteComponentProps} from 'react-router';
import AggregateStateView from './pages/aggregateDetails/components/AggregateStateView';
import AggregateCommandsWidget from './pages/aggregateDetails/components/AggregateCommandsWidget';
import AggregateSearchBar from './pages/common/components/AggregateSearchBar';

interface AggregateDetailsPageProps extends RouteComponentProps {

}

const AggregateDetailsPage = (props: AggregateDetailsPageProps) => {

    const aggregateType = (props.match.params as any).aggregateType;
    const aggregateId = (props.match.params as any).aggregateId;
    const version = (props.match.params as any).version || undefined;
    const [commandsExecuted, setCommandsExecuted] = useState(0);

    const handleCommandExecuted = () => {
        setCommandsExecuted(commandsExecuted + 1);
    };

    return (
        <Grid container={true} spacing={3}>
            <Grid item={true} md={8}>
                <AggregateSearchBar aggregateType={aggregateType} aggregateId={aggregateId} />
            </Grid>
            <Grid item={true} md={6}>
                <Grid container={true} spacing={3}>
                    <Grid item={true} md={12}>
                        <AggregateStateView aggregateType={aggregateType}
                                            aggregateId={aggregateId}
                                            version={version}
                                            commandsExecuted={commandsExecuted}
                        />
                    </Grid>
                    <Grid item={true} md={12}>
                        <AggregateCommandsWidget aggregateType={aggregateType}
                                                 onCommandExecuted={handleCommandExecuted}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item={true} md={6}>
                <AggregateDetailsEventsWidget aggregateType={aggregateType} 
                                              aggregateId={aggregateId}
                                              commandsExecuted={commandsExecuted}
                />
            </Grid>
        </Grid>
    );
};

export default AggregateDetailsPage;
