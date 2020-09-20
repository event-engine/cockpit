import {JSONSchema} from '../api/types';
import * as _ from 'lodash';

export const convertJsonSchemaToEditorValue = (schema: JSONSchema, definitions: Record<string, JSONSchema>): any => {
    let editorValue: any = '';
    schema = _.clone(schema);

    if(!schema.type) {
        if(schema['$ref']) {
            schema = {...resolveRef(schema['$ref'], schema, definitions)};
        }
    }

    if(!schema.type && !schema.enum) {
        // Object is the default type if no type is set
        return { type: 'object'};
    }

    if(schema.enum && Array.isArray(schema.enum)) {
        return schema.enum.join('|');
    }

    if(Array.isArray(schema.type)) {
        for (const type of schema.type) {
            // Pick first non null type from the list
            if(type.toLowerCase() !== 'null') {
                schema.type = type;
                break;
            }
        }
    }

    switch (schema.type.toLowerCase()) {
        case 'string':
            return 'string';
        case 'number':
            return 0;
        case 'integer':
            return 0;
        case 'boolean':
            return false;
        case 'array':
            return [
                convertJsonSchemaToEditorValue(schema.items || {}, definitions),
            ];
        case 'object':
            editorValue = {};
            if(!schema.properties) {
                schema.properties = {};
            }

            Object.keys(schema.properties).forEach(prop => {
                editorValue[prop] = convertJsonSchemaToEditorValue(schema.properties[prop], definitions);
            });

            return editorValue;
        default:
            return 'unknown';
    }
};

const resolveRef = (ref: string, schema: JSONSchema, definitions: Record<string, JSONSchema>): JSONSchema => {
    ref = ref.replace('#/definitions/', '');

    // eslint-disable-next-line no-prototype-builtins
    if(definitions.hasOwnProperty(ref)) {
        return definitions[ref];
    }

    // We use string as default schema for unknown refs
    return { type: 'string'};
};
