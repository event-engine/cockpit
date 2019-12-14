
export interface EventEngineSchema {
    aggregates: Aggregate[];
}

export type JSONSchema = any;

export interface Aggregate {
    aggregateType: string;
    aggregateIdentifier: string;
    aggregateStream: string;
    aggregateCollection: string;
    commands: Command[];
    events: Event[];
}

export interface Command {
    commandName: string;
    createAggregate: boolean;
    schema: JSONSchema;
}

export interface Event {
    eventName: string;
    schema: JSONSchema;
}
