import {Button, Card, CardContent, Container, Divider, Typography} from '@material-ui/core';
import Editor, {monaco} from '@monaco-editor/react';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Event, JSONSchema} from '../../api/types';
import {makeThemeSelector} from '../../selector/settingsSelector';
import {makeJsonSchemaDefinitionsSelector} from '../../selector/systemSchemaSelector';
import AxiosResponseViewer from '../common/components/AxiosResponseViewer';
import {Alert, AlertTitle} from '@material-ui/lab';
import {convertJsonSchemaToEditorValue} from '../../util/convertJsonSchemaToEditorValue';
import {makeEventErrorSelector, makeEventResponseSelector} from '../../selector/eventSelector';
import {clearEvent, executeEvent} from '../../action/eventCommands';

interface EventPayloadFormProps {
    event: Event;
}

let monacoInstance: any = null;
monaco.init().then(instance => monacoInstance = instance);

const EventForm = (props: EventPayloadFormProps) => {

    const dispatch = useDispatch();
    const theme = useSelector(makeThemeSelector());
    const jsonSchemaDefinitions: Record<string, JSONSchema> | null = useSelector(makeJsonSchemaDefinitionsSelector());
    const response = useSelector(makeEventResponseSelector());
    const error = useSelector(makeEventErrorSelector());
    const valueGetterRef = useRef();
    const editorRef = useRef();

    useEffect(() => {
        if (!editorRef.current) {
            return;
        }

        dispatch(clearEvent({}));
        updateEditorModel();
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [props.event]);

    const handleEditorDidMount = (valueGetter: any, editor: any) => {
        valueGetterRef.current = valueGetter;
        editorRef.current = editor;

        updateEditorModel();
    };

    const updateEditorModel = () => {
        const defaultEditorValue: Record<string, any> = convertJsonSchemaToEditorValue(props.event.schema, jsonSchemaDefinitions || {});

        const jsonCode = JSON.stringify(defaultEditorValue, null, 2);
        const modelUri = monacoInstance.Uri.parse(`command_${props.event.eventName}.json`);
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
                schema: { ...props.event.schema, definitions: jsonSchemaDefinitions },
            }],
        });

        (editorRef.current as any).setModel(model);
    };

    const handleExecuteEvent = () => {
        if (!valueGetterRef.current) {
            return;
        }

        dispatch(executeEvent({
            eventName: props.event.eventName,
            payload: (valueGetterRef as any).current(),
        }));
    };

    return (
        <Card>
            <CardContent>
                <div style={{ height: '50px' }}>
                    <Typography style={{ display: 'inline' }}>{props.event.eventName}</Typography>
                    <Button
                        style={{ float: 'right' }}
                        variant={'contained'}
                        color={'primary'}
                        children={'Send'}
                        onClick={handleExecuteEvent}
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
                        scrollBeyondLastLine: false,
                        hover: {
                            delay: 500,
                        },
                    }}
                />
                <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
                <div>
                    {response && <AxiosResponseViewer response={response} />}
                    {!response && error && (
                        <Container disableGutters={true}>
                            <Alert severity={'error'}>
                                <AlertTitle>{error.name}</AlertTitle>
                                {error.message}
                            </Alert>
                        </Container>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default EventForm;
