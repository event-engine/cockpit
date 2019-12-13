import { createSelector } from 'reselect';
import {ReduxState} from "../reducer";

const stateKey = 'eventEngineSchema';

export const rawSchemaSelector = (state: ReduxState) => state[stateKey].rawSchema;

export const makeAggregateTypeListSelector = () => {
    return createSelector([rawSchemaSelector], (rawSchema) => {
        return !rawSchema ? null : rawSchema.aggregates.map(aggregate => aggregate.aggregateType);
    });
};
