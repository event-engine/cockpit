import React, {useImperativeHandle, useRef} from 'react';
import {AggregateEvent, Event, JSONSchema} from '../../../api/types';
import Editor, {monaco} from '@monaco-editor/react';
import {Container, Grid} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {makeJsonSchemaDefinitionsSelector} from '../../../selector/systemSchemaSelector';
import {makeThemeSelector} from '../../../selector/settingsSelector';
import AxiosResponseViewer from '../../common/components/AxiosResponseViewer';
import {Alert, AlertTitle} from '@material-ui/lab';
import {makeEventErrorSelector, makeEventResponseSelector} from '../../../selector/eventSelector';
import {clearEvent} from '../../../action/eventCommands';

interface EventFormProps {
    event: AggregateEvent;
    definition: Event;
}

let monacoInstance: any = null;
monaco.init().then(instance => monacoInstance = instance);

const EventForm = (props: EventFormProps, ref: any) => {

    const dispatch = useDispatch();
    const jsonSchemaDefinitions: Record<string, JSONSchema> | null = useSelector(makeJsonSchemaDefinitionsSelector());
    const theme = useSelector(makeThemeSelector());
    const response = useSelector(makeEventResponseSelector());
    const error = useSelector(makeEventErrorSelector());
    const editorRef = useRef();
    const valueGetterRef = useRef();

    useImperativeHandle(ref, () => ({
        retrievePayload: (): string => {
            return (valueGetterRef as any).current();
        },
    }));

    const defaultEditorValue: Record<string, any> = props.event.payload;

    const handleEditorDidMount = (valueGetter: any, editor: any) => {
        valueGetterRef.current = valueGetter;
        editorRef.current = editor;

        const jsonCode = JSON.stringify(defaultEditorValue, null, 2);
        const modelUri = monacoInstance.Uri.parse(`${props.event.eventName}.json`);
        let model = monacoInstance.editor.getModel(modelUri);

        if (null === model) {
            model = monacoInstance.editor.createModel(jsonCode, 'json', modelUri);
        } else  {
            model.setValue(jsonCode);
        }

        dispatch(clearEvent({}));

        monacoInstance.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [{
                fileMatch: [modelUri.toString()],
                schema: { ...props.definition.schema, definitions: jsonSchemaDefinitions },
            }],
        });
        editor.setModel(model);
    };

    return (
        <div>
            <Grid container={true} spacing={3}>
                <Grid item={true} md={6}>
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
                <Grid item={true} md={6}>
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
                </Grid>
            </Grid>
        </div>
    );
};

export default React.forwardRef(EventForm);
