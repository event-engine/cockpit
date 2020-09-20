import React, {useImperativeHandle, useRef} from 'react';
import {Command, JSONSchema} from '../../../api/types';
import Editor, {monaco} from '@monaco-editor/react';
import {Grid} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {makeJsonSchemaDefinitionsSelector} from '../../../selector/systemSchemaSelector';
import {makeThemeSelector} from '../../../selector/settingsSelector';
import {convertJsonSchemaToEditorValue} from "../../../util/convertJsonSchemaToEditorValue";

interface CommandFormProps {
    command: Command;
}

let monacoInstance: any = null;
monaco.init().then(instance => monacoInstance = instance);

const CommandForm = (props: CommandFormProps, ref: any) => {

    const jsonSchemaDefinitions: Record<string, JSONSchema> | null = useSelector(makeJsonSchemaDefinitionsSelector());
    const theme = useSelector(makeThemeSelector());
    const editorRef = useRef();
    const valueGetterRef = useRef();

    useImperativeHandle(ref, () => ({
        retrievePayload: (): string => {
            return (valueGetterRef as any).current();
        },
    }));

    const defaultEditorValue: Record<string, any> = convertJsonSchemaToEditorValue(props.command.schema, jsonSchemaDefinitions || {});

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
                        theme={theme === 'dark' ? 'dark' : undefined}
                        editorDidMount={handleEditorDidMount}
                        options={{
                            minimap: {
                                enabled: false,
                            },
                            formatOnPaste: true,
                            scrollBeyondLastLine: false,
                            hover: {
                                delay: 500,
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default React.forwardRef(CommandForm);
