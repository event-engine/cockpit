
export interface SystemSchema {
    aggregates: Aggregate[];
    queries: Query[];
    commands: Command[];
    events: Event[];
    definitions: Record<string, any>;
}

export type JSONSchema = any;

export enum MultiStoreMode {
    EventState = 'mode_e_s',
    Event = 'mode_e',
    State = 'mode_s',
}

export type AggregateRelations = {[prop: string]: string};

export interface Aggregate {
    aggregateType: string;
    aggregateIdentifier: string;
    aggregateStream: string;
    aggregateCollection: string;
    multiStoreMode: MultiStoreMode;
    commands: Command[];
    events: Event[];
    relations?: AggregateRelations;
    eventMapLink?: string;
}

export interface Query {
    queryName: string;
    schema: JSONSchema;
    eventMapLink?: string;
}

export interface Command {
    commandName: string;
    aggregateType: string|null;
    createAggregate: boolean;
    schema: JSONSchema;
    eventMapLink?: string;
}

export interface Event {
    eventName: string;
    schema: JSONSchema;
    aggregateType?: string;
    eventMapLink?: string;
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
