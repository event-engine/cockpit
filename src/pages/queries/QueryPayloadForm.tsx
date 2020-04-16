import {Query} from '../../api/types';
import {Card, CardContent, CardHeader, Divider, Typography, Button} from '@material-ui/core';
import Editor, {monaco} from '@monaco-editor/react';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeJsonSchemaDefinitionsSelector} from '../../selector/systemSchemaSelector';
import {makeThemeSelector} from '../../selector/settingsSelector';
import {executeQuery} from '../../action/queryCommands';
import {makeQueryErrorSelector, makeQueryResultSelector} from '../../selector/querySelector';

interface QueryPayloadFormProps {
    query: Query;
}

let monacoInstance: any = null;
monaco.init().then(instance => monacoInstance = instance);

const QueryPayloadForm = (props: QueryPayloadFormProps) => {

    const dispatch = useDispatch();
    const theme = useSelector(makeThemeSelector());
    const jsonSchemaDefinitions = useSelector(makeJsonSchemaDefinitionsSelector());
    const result = useSelector(makeQueryResultSelector());
    const error = useSelector(makeQueryErrorSelector());
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

    const handleExecuteQuery = () => {
        if (!valueGetterRef.current) {
            return;
        }

        dispatch(executeQuery({ queryName: props.query.queryName, payload: (valueGetterRef as any).current()}));
    };

    // @todo introduce AxiosResponse view that handles both success and error responses; also handle general errors (like CORS)

    return (
        <Card>
            <CardContent>
                <div style={{ height: '50px' }}>
                    <Typography style={{ display: 'inline' }}>{props.query.queryName}</Typography>
                    <Button
                        style={{ float: 'right' }}
                        variant={'contained'}
                        color={'primary'}
                        children={'Send'}
                        onClick={handleExecuteQuery}
                    />
                </div>
                <Editor
                    height={'250px'}
                    language={'json'}
                    theme={theme === 'dark' ? 'dark' : undefined}
                    editorDidMount={handleEditorDidMount}
                    options={{
                        minimap: {
                            enabled: false,
                        },
                        formatOnPaste: true,
                    }}
                />
                <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
                <div>
                    {JSON.stringify(result)}
                    {error && JSON.stringify((error as any).response)}
                </div>
            </CardContent>
        </Card>
    );
};

export default QueryPayloadForm;
