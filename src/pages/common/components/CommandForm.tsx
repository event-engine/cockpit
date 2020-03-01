import React, {useEffect, useState} from 'react';
import {Command} from '../../../api/types';
import StringProperty from './CommandForm/StringProperty';
import {ControlledEditor} from '@monaco-editor/react';
import {Grid} from '@material-ui/core';

interface CommandFormProps {
    command: Command;
    payload: any;
    onChangePayload: (value: any) => void;
}

const CommandForm = (props: CommandFormProps) => {

    const propertySchema = props.command.schema.properties;
    const properties = Object.keys(propertySchema);
    const requiredProperties: string[] = props.command.schema.required;console.log(propertySchema);

    useEffect(() => {
        const defaultEditorValue: Record<string, any> = {};
        properties.forEach((propertyName: string) => {
            if (Array.isArray(propertySchema[propertyName].type)) {
                defaultEditorValue[propertyName] = propertySchema[propertyName].type.join('|');
            } else {
                switch (propertySchema[propertyName].type) {
                    case 'object': defaultEditorValue[propertyName] = {}; break;
                    default: defaultEditorValue[propertyName] = propertySchema[propertyName].type;
                }
            }
        });
        props.onChangePayload(defaultEditorValue);
    }, []);

    return (
        <div>
            <Grid container={true} spacing={3}>
                <Grid item={true} md={6}>
                    <ControlledEditor
                        height={'500px'}
                        language={'json'}
                        value={JSON.stringify(props.payload, null, 2)}
                        editorDidMount={(getEditorValue: any, monaco: any) => {
                            console.log(monaco);
                            // Possible to use schema here?
                        }}
                        onChange={(ev: any, value: string|undefined) => {
                            props.onChangePayload(JSON.parse(value || '{}'));
                        }}
                    />
                </Grid>
                <Grid item={true} md={6}>
                    {properties
                        .map((propertyName: string) => {
                            switch (propertySchema[propertyName].type) {
                                case 'string': {
                                    return (
                                        <StringProperty
                                            name={propertyName}
                                            required={requiredProperties.includes(propertyName)}
                                            value={props.payload[propertyName]}
                                            onChange={(value: string) => props.onChangePayload({...props.payload, [propertyName]: value})}
                                            {...propertySchema[propertyName]}
                                        />
                                    );
                                }
                                default: {
                                    return 'Unsupported property type';
                                }
                            }
                        })
                        .map((node: React.ReactNode, index: number) => (
                            <div key={index} style={{ marginTop: 15, marginBottom: 15 }}>{node}</div>
                        ))
                    }
                </Grid>
            </Grid>
        </div>
    );
};

export default CommandForm;
