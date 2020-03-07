import React from 'react';
import {Card, CardContent, CardHeader, Divider} from '@material-ui/core';

interface AggregateDetailsEventsWidgetProps {

}

const AggregateDetailsEventsWidget = (props: AggregateDetailsEventsWidgetProps) => {
    return (
        <Card>
            <CardHeader title={'Events'} />
            <Divider />
            <CardContent>
            </CardContent>
        </Card>
    );
};

export default AggregateDetailsEventsWidget;
