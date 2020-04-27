
export interface SystemSchema {
    aggregates: Aggregate[];
    queries: Query[];
    commands: Command[];
    definitions: Record<string, any>;
}

export type JSONSchema = any;

export enum MultiStoreMode {
    EventState = 'mode_e_s',
    Event = 'mode_e',
    State = 'mode_s',
}

export interface Aggregate {
    aggregateType: string;
    aggregateIdentifier: string;
    aggregateStream: string;
    aggregateCollection: string;
    multiStoreMode: MultiStoreMode;
    commands: Command[];
    events: Event[];
}

export interface Query {
    queryName: string;
    schema: JSONSchema;
}

export interface Command {
    commandName: string;
    aggregateType: string|null;
    createAggregate: boolean;
    schema: JSONSchema;
}

export interface Event {
    eventName: string;
    schema: JSONSchema;
}

export interface PersistedAggregateState {
    version: number;
    state: object;
}

export interface AggregateEvent {
    eventName: string;
    aggregateVersion: number;
    createdAt: string;
    metadata: any;
    payload: any;
}

export type AggregateState = object;
