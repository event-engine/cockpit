import React, {useState} from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
} from '@material-ui/core';
import {Event} from './api/types';
import {useSelector} from 'react-redux';
import {makeEventListSelector} from './selector/systemSchemaSelector';
import {Redirect, RouteComponentProps, withRouter} from 'react-router';
import * as Route from './routes';
import EventCategoryExpansionPanel from './pages/events/EventCategoryExpansionPanel';
import EventForm from './pages/events/EventForm';

interface EventsPageParams {
    event?: string;
}

interface EventsPageProps extends RouteComponentProps<EventsPageParams> {}

const EventsPage = (props: EventsPageProps) => {
    const events = useSelector(makeEventListSelector());

    const [selectedEvent, setSelectedEvent] = useState<string|undefined>(props.match.params.event);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const categorizedEvents = events.reduce(
        (accumulator: Record<string, Event[]>, event: Event) => {
            const category = event.aggregateType || 'Public Events';
            return { ...accumulator, [category]: [...(accumulator[category] || []), event] };
        },
        {}
    );

    const handleChangeSelectedEvent = (newEvent: string) => {
        setSelectedEvent(newEvent);
        setShouldRedirect(true);
    };

    const selectedEventObject = events.find(event => event.eventName === selectedEvent);

    if(shouldRedirect && props.match.params.event === selectedEvent) {
        setShouldRedirect(false);
    }

    return (
        <>
            {shouldRedirect && <Redirect to={Route.makeExecuteEventPath(selectedEvent as string)} />}
            <Grid container={true} spacing={3}>
                <Grid item={true} md={3}>
                    <Card>
                        <CardHeader title={'Events'} />
                        <Divider />
                        <CardContent>
                            {categorizedEvents['Public Events'] && <EventCategoryExpansionPanel
                                key={'Public Events'}
                                category={'Public Events'}
                                eventList={categorizedEvents['Public Events']}
                                selectedEvent={selectedEvent}
                                onChangeSelectedEvent={handleChangeSelectedEvent}
                            />}
                            {Object.keys(categorizedEvents).map(category => {
                                if(category === 'Public Events') {
                                    return <></>;
                                }

                                return <EventCategoryExpansionPanel
                                    key={category}
                                    category={category}
                                    eventList={categorizedEvents[category]}
                                    selectedEvent={selectedEvent}
                                    onChangeSelectedEvent={handleChangeSelectedEvent}
                                />;
                            })}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item={true} md={9}>
                    {selectedEventObject && <EventForm event={selectedEventObject} />}
                </Grid>
            </Grid>
        </>
    );
};

export default withRouter(EventsPage);
