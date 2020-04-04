import React, {useImperativeHandle, useRef} from 'react';
import {Command} from '../../../api/types';
import Editor, {monaco} from '@monaco-editor/react';
import {Grid} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {makeJsonSchemaDefinitionsSelector} from '../../../selector/systemSchemaSelector';

interface CommandFormProps {
    command: Command;
}

let monacoInstance: any = null;
monaco.init().then(instance => monacoInstance = instance);

const CommandForm = React.forwardRef((props: CommandFormProps, ref: any) => { // @todo

    const jsonSchemaDefinitions = useSelector(makeJsonSchemaDefinitionsSelector());
    const editorRef = useRef();
    const valueGetterRef = useRef();

    useImperativeHandle(ref, () => ({
        retrievePayload: (): string => {
            return (valueGetterRef as any).current();
        },
    }));

    const propertySchema = props.command.schema.properties;

    const defaultEditorValue: Record<string, any> = {};
    Object.keys(propertySchema).forEach((propertyName: string) => {
        if (Array.isArray(propertySchema[propertyName].type)) {
            defaultEditorValue[propertyName] = propertySchema[propertyName].type.join('|');
        } else {
            switch (propertySchema[propertyName].type) {
                case 'object': defaultEditorValue[propertyName] = {}; break;
                default: defaultEditorValue[propertyName] = propertySchema[propertyName].type;
            }
        }
    });

    const handleEditorDidMount = (valueGetter: any, editor: any) => {
        valueGetterRef.current = valueGetter;
        editorRef.current = editor;

        const jsonCode = JSON.stringify(defaultEditorValue, null, 2);
        const modelUri = monacoInstance.Uri.parse(`${props.command.commandName}.json`);
        let model = monacoInstance.editor.getModel(modelUri);

        if (null === model) {
            model = monacoInstance.editor.createModel(jsonCode, 'json', modelUri);
        } else  {
            model.setValue(jsonCode);
        }

        monacoInstance.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [{
                fileMatch: [modelUri.toString()],
                schema: { ...props.command.schema, definitions: jsonSchemaDefinitions },
            }],
        });
        editor.setModel(model);
    };

    return (
        <div>
            <Grid container={true} spacing={3}>
                <Grid item={true} md={12}>
                    <Editor
                        height={'500px'}
                        language={'json'}
                        editorDidMount={handleEditorDidMount}
                        options={{
                            minimap: {
                                enabled: false,
                            },
                            formatOnPaste: true,
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
});

export default CommandForm;
