import React from 'react';
import classes from './BuildControl.css'
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove'

const buildControl=(props)=>{
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <Button variant="fab" mini size='medium' color="secondary" aria-label="add" className={classes.button} onClick={props.added}>
                <AddIcon/>
            </Button>
            &nbsp;
            <Button variant="fab" mini size='medium' color="default" aria-label="add" className={classes.button} disabled={props.disabled} onClick={props.removed}>
                <RemoveIcon/>
            </Button>
        </div>

    );
}
export default buildControl;