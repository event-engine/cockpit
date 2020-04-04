import { createSelector } from 'reselect';
import {ReduxState} from '../reducer';

const stateKey = 'systemSchema';

export const normalizeAggregateType = (aggregateType: string) => aggregateType.toLowerCase();

export const systemSchemaSelector = (state: ReduxState) => state[stateKey].systemSchema;

export const makeAggregateTypeListSelector = () => {
    return createSelector([systemSchemaSelector], rawSchema => {
        return !rawSchema ? null : rawSchema.aggregates.map(aggregate => aggregate.aggregateType);
    });
};

export const makeJsonSchemaDefinitionsSelector = () => {
    return createSelector([systemSchemaSelector], rawSchema => {
        return !rawSchema ? null : rawSchema.definitions;
    });
};

export const makeAggregateEventsSelector = (aggregateType: string) => {
    return createSelector([systemSchemaSelector], rawSchema => {
        if (!rawSchema) {
            return null;
        }

        return rawSchema.aggregates.find(
            aggregate => normalizeAggregateType(aggregate.aggregateType) === normalizeAggregateType(aggregateType),
        )!.events;
    });
};

export const makeAggregateCommandsSelector = (aggregateType: string) => {
    return createSelector([systemSchemaSelector], rawSchema => {
        if (!rawSchema) {
            return null;
        }

        return rawSchema.aggregates.find(
            aggregate => normalizeAggregateType(aggregate.aggregateType) === normalizeAggregateType(aggregateType),
        )!.commands;
    });
};

export const makeAggregateCreationCommandsSelector = (aggregateType: string) => {
    return createSelector([makeAggregateCommandsSelector(aggregateType)], commands => {
        if (!commands) {
            return null;
        }

        return commands.filter(command => command.createAggregate);
    });
};

export const makeAggregateNonCreationCommandsSelector = (aggregateType: string) => {
    return createSelector([makeAggregateCommandsSelector(aggregateType)], commands => {
        if (!commands) {
            return null;
        }

        return commands.filter(command => !command.createAggregate);
    });
};

export const makeAggregateIdentifierSelector = (aggregateType: string) => {
    return createSelector([systemSchemaSelector], rawSchema => {
        if (!rawSchema) {
            return null;
        }

        return rawSchema.aggregates.find(
            aggregate => normalizeAggregateType(aggregate.aggregateType) === normalizeAggregateType(aggregateType),
        )!.aggregateIdentifier;
    });
};

export const makeAggregateMultiStoreModeSelector = (aggregateType: string) => {
    return createSelector([systemSchemaSelector], rawSchema => {
        if (!rawSchema) {
            return null;
        }

        return rawSchema.aggregates.find(
            aggregate => normalizeAggregateType(aggregate.aggregateType) === normalizeAggregateType(aggregateType),
        )!.multiStoreMode;
    });
};

export const makeRawAggregateTypeSelector = (aggregateType: string) => {
    return createSelector([systemSchemaSelector], rawSchema => {
        if (!rawSchema) {
            return null;
        }

        return rawSchema.aggregates.find(
            aggregate => normalizeAggregateType(aggregate.aggregateType) === normalizeAggregateType(aggregateType),
        )!.aggregateType;
    });
};
