import {Query} from '../../api/types';
import {Card, CardContent, CardHeader, Divider} from '@material-ui/core';
import Editor, {monaco} from '@monaco-editor/react';
import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {makeJsonSchemaDefinitionsSelector} from '../../selector/systemSchemaSelector';

interface QueryPayloadFormProps {
    query: Query;
}

let monacoInstance: any = null;
monaco.init().then(instance => monacoInstance = instance);

const QueryPayloadForm = (props: QueryPayloadFormProps) => {

    const jsonSchemaDefinitions = useSelector(makeJsonSchemaDefinitionsSelector());
    const valueGetterRef = useRef();
    const editorRef = useRef();

    const propertySchema = props.query.schema.properties || {};

    useEffect(() => {
        if (!editorRef.current) {
            return;
        }

        updateEditorModel();
    }, [props.query]);

    const handleEditorDidMount = (valueGetter: any, editor: any) => {
        valueGetterRef.current = valueGetter;
        editorRef.current = editor;

        updateEditorModel();
    };

    const updateEditorModel = () => {
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

        const jsonCode = JSON.stringify(defaultEditorValue, null, 2);
        const modelUri = monacoInstance.Uri.parse(`query_${props.query.queryName}.json`);
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
                schema: { ...props.query.schema, definitions: jsonSchemaDefinitions },
            }],
        });

        (editorRef.current as any).setModel(model);
    };

    return (
        <Card>
            <CardHeader title={`${props.query.queryName} Payload`} />
            <Divider />
            <CardContent>
                <Editor
                    height={'350px'}
                    language={'json'}
                    editorDidMount={handleEditorDidMount}
                    options={{
                        minimap: {
                            enabled: false,
                        },
                        formatOnPaste: true,
                    }}
                />
            </CardContent>
        </Card>
    );
};

export default QueryPayloadForm;
