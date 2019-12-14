import { createSelector } from 'reselect';
import {ReduxState} from "../reducer";

const stateKey = 'eventEngineSchema';

export const rawSchemaSelector = (state: ReduxState) => state[stateKey].rawSchema;

export const normalizeAggregateType = (aggregateType: string) => aggregateType.toLowerCase();

export const makeAggregateTypeListSelector = () => {
    return createSelector([rawSchemaSelector], (rawSchema) => {
        return !rawSchema ? null : rawSchema.aggregates.map(aggregate => aggregate.aggregateType);
    });
};

export const makeAggregateEventsSelector = (aggregateType: string) => {
    return createSelector([rawSchemaSelector], (rawSchema) => {
        if (!rawSchema) {
            return null;
        }

        return rawSchema.aggregates.find(
            aggregate => normalizeAggregateType(aggregate.aggregateType) === normalizeAggregateType(aggregateType)
        )!['events'];
    });
};
