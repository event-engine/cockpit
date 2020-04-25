import {IconButton, Menu, MenuItem} from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import React, {useRef, useState} from 'react';
import {copyToClipboard} from '../../../util/copyToClipboard';
import {v4 as uuidv4} from 'uuid';

interface GenerateMenuProps {
    className?: string;
}

const GenerateMenu = (props: GenerateMenuProps) => {
    const copyToClipboardRef = useRef<HTMLDivElement|null>(null);
    const [generateAnchorElement, setGenerateAnchorElement] = useState(null);

    const handleGenerateButtonClick = (event: React.MouseEvent<any>) => {
        setGenerateAnchorElement(event.currentTarget);
    };

    const closeGenerateMenu = () => {
        setGenerateAnchorElement(null);
    };

    return (
        <>
            <IconButton className={props.className} title={'Generate ...'} onClick={handleGenerateButtonClick}>
                <CodeIcon />
            </IconButton>
            <div ref={copyToClipboardRef} />
            <Menu
                anchorEl={generateAnchorElement}
                keepMounted={true}
                open={Boolean(generateAnchorElement)}
                onClose={closeGenerateMenu}
                style={{ top: '40px' }}
                children={(
                    <MenuItem
                        onClick={() => {
                            window.setTimeout(
                                () => copyToClipboard(uuidv4(), copyToClipboardRef.current || undefined),
                                200
                            );
                            closeGenerateMenu();
                        }}
                        children={'UUID v4'}
                    />
                )}
            />
        </>
    );
};

export default GenerateMenu;
