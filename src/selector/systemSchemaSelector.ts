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

        const aggregate = rawSchema.aggregates.find(
            aggregate => normalizeAggregateType(aggregate.aggregateType) === normalizeAggregateType(aggregateType),
        );

        if(!aggregate) {
            return null;
        }

        return aggregate.events;
    });
};

export const makeAggregateCommandsSelector = (aggregateType: string) => {
    return createSelector([systemSchemaSelector], rawSchema => {
        if (!rawSchema) {
            return null;
        }

        const aggregate = rawSchema.aggregates.find(
            aggregate => normalizeAggregateType(aggregate.aggregateType) === normalizeAggregateType(aggregateType),
        );

        if(!aggregate) {
            return null;
        }

        return aggregate.commands;
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

        const aggregate = rawSchema.aggregates.find(
            aggregate => normalizeAggregateType(aggregate.aggregateType) === normalizeAggregateType(aggregateType),
        );

        if(!aggregate) {
            return null;
        }

        return aggregate.aggregateIdentifier;
    });
};

export const makeAggregateMultiStoreModeSelector = (aggregateType: string) => {
    return createSelector([systemSchemaSelector], rawSchema => {
        if (!rawSchema) {
            return null;
        }

        const aggregate = rawSchema.aggregates.find(
            aggregate => normalizeAggregateType(aggregate.aggregateType) === normalizeAggregateType(aggregateType),
        );

        if(!aggregate) {
            return null;
        }

        return aggregate.multiStoreMode;
    });
};

export const makeAggregateEventMapLinkSelector = (aggregateType: string) => {
    return createSelector([systemSchemaSelector], rawSchema => {
        if (!rawSchema) {
            return null;
        }

        const aggregate = rawSchema.aggregates.find(
            aggregate => normalizeAggregateType(aggregate.aggregateType) === normalizeAggregateType(aggregateType),
        );

        if(!aggregate) {
            return null;
        }

        return aggregate.eventMapLink;
    });
};

export const makeRawAggregateTypeSelector = (aggregateType: string) => {
    return createSelector([systemSchemaSelector], rawSchema => {
        if (!rawSchema) {
            return null;
        }

        const aggregate = rawSchema.aggregates.find(
            aggregate => normalizeAggregateType(aggregate.aggregateType) === normalizeAggregateType(aggregateType),
        );

        if(!aggregate) {
            return null;
        }

        return aggregate.aggregateType;
    });
};

export const makeQueryListSelector = () => {
    return createSelector([systemSchemaSelector], rawSchema => {
         return rawSchema ? rawSchema.queries : [];
    });
};

export const makeCommandListSelector = () => {
    return createSelector([systemSchemaSelector], rawSchema => {
        return rawSchema ? rawSchema.commands : [];
    });
};

export const makeEventListSelector = () => {
    return createSelector([systemSchemaSelector], rawSchema => {
        return rawSchema ? rawSchema.events : [];
    });
};
