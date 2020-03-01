import React from 'react';
import {Command} from '../../../api/types';
import StringProperty from './CommandForm/StringProperty';
import Editor from '@monaco-editor/react';

interface CommandFormProps {
    command: Command;
}

const CommandForm = (props: CommandFormProps) => {

    const propertySchema = props.command.schema.properties;
    const properties = Object.keys(propertySchema);
    const requiredProperties: string[] = props.command.schema.required;

    const editorValue: Record<string, string> = {};
    properties.forEach((propertyName: string) => {
        editorValue[propertyName] = propertySchema[propertyName].type;
    });

    return (
        <div>
            <Editor
                height={'500px'}
                language={'json'}
                value={JSON.stringify(editorValue, null, 2)}
                editorDidMount={(getEditorValue: any, monaco: any) => {
                    console.log(monaco);
                    // Possible to use schema here?
                }}
            />
            {/*properties
                .map((propertyName: string) => {
                    switch (propertySchema[propertyName].type) {
                        case 'string': {
                            return (
                                <StringProperty
                                    name={propertyName}
                                    required={requiredProperties.includes(propertyName)}
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
            */}
        </div>
    );
};

export default CommandForm;
