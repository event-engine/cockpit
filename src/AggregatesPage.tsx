import React, {useEffect} from 'react';
import {RouteComponentProps} from "react-router";

interface AggregatesPageProps extends RouteComponentProps {

}

const AggregatesPage = (props: AggregatesPageProps) => {

    const type = (props.match.params as any).aggregate;

    useEffect(() => {
        console.log("effect!");
    }, [type]);

    return (
        <div>
            Event Engine UI - {type}
        </div>
    );
};

export default AggregatesPage;
