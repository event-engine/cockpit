import {Card as MuiCard, makeStyles} from '@material-ui/core';
import {CardProps as CardPropsMaterialUi} from '@material-ui/core/Card';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative' ,
    },
    progressWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(50, 50, 50, 0.2)',
    },
    progress: {
        position: 'absolute',
        top: '48%',
        left: '48%',
    },
}));

interface LoadingCardProps {
    loading: boolean;
    cardProps?: CardPropsMaterialUi;
    children: React.ReactElement|React.ReactElement[];
}

const LoadingCard = (props: LoadingCardProps) => {

    const classes = useStyles();

    return (
        <MuiCard {...props.cardProps} className={classes.root}>
            {props.children}
            {props.loading && (
                <div className={classes.progressWrapper}>
                    <CircularProgress className={classes.progress} size={24}/>
                </div>
            )}
        </MuiCard>
    );
};

export default LoadingCard;
