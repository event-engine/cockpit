import {Link as ReactRouterLink} from 'react-router-dom';
import MaterialUiLink from '@material-ui/core/Link';
import React, {ReactNode} from 'react';

interface LinkProps {
    children: ReactNode;
    to: string;
}

const Link = (props: LinkProps) => {
    return (
        <MaterialUiLink component={ReactRouterLink} to={props.to}>
            {props.children}
        </MaterialUiLink>
    );
};

export default Link;
