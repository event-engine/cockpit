import React from 'react';
import {TextField} from '@material-ui/core';

interface StringPropertyProps {
    name: string;
    required: boolean;
    value: string;
    onChange: (value: string) => void;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    enum: string[];
}

const buildPlaceholder = (pattern?: string, minLength?: number, maxLength?: number, enumValues?: string[]) => {
    if (pattern) {
        return pattern;
    }

    if (enumValues) {
        return enumValues.join(', ');
    }

    let placeholder = '';

    if (minLength) {
        placeholder += ' minLength:' + minLength;
    }

    if (maxLength) {
        placeholder += ' maxLength:' + maxLength;
    }

    return placeholder.trim();
};

const StringProperty = (props: StringPropertyProps) => {
    return (
        <TextField
            label={props.name}
            value={props.value || ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)}
            placeholder={buildPlaceholder(props.pattern, props.minLength, props.maxLength, props.enum)}
            fullWidth={true}
            required={props.required}
        />
    );
};

export default StringProperty;
