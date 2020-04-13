import React, {ReactText} from 'react';
import JSONTree from 'react-json-tree';
import {useSelector} from 'react-redux';
import {makeThemeSelector} from '../../../selector/settingsSelector';

const jsonTreeTheme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633',
};

const darkThemeOverrides = {
    base00: '#424242',
};

interface JsonTreeProps {
    data: object;
    propertyClickActions?: Record<string, (value: string|number|boolean|null|undefined) => void>;
}

const JsonTree = (props: JsonTreeProps) => {

    const theme = useSelector(makeThemeSelector());

    const valueRenderer = props.propertyClickActions
        ? (displayValue: string|number, rawValue?: string|number|boolean|null, ...keyPath: Array<string|number>) => {
            if (typeof keyPath[0] !== 'string') {
                keyPath.shift();
            }

            const propertyKey = keyPath.reverse().join('.').replace('root.', '');

            if (props.propertyClickActions![propertyKey]) {
                return (
                    <span
                        onClick={() => props.propertyClickActions![propertyKey](rawValue)}
                        style={{ cursor: 'pointer', textDecoration: 'underline' }}
                        children={displayValue}
                    />
                );
            }

            return <span>{displayValue}</span>;
        }
        : undefined;

    return (
        <JSONTree
            data={props.data}
            theme={{ ...jsonTreeTheme, ...(theme === 'light' ? {} : darkThemeOverrides) }}
            invertTheme={theme === 'light'}
            shouldExpandNode={(name: ReactText[], data: object, level: number) => level < 2}
            valueRenderer={valueRenderer}
        />
    );
};

export default JsonTree;
