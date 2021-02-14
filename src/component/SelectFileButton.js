import React from 'react'
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        color: 'white'
    },
}));

export default function SelectFileButton(props) {

    const classes = useStyles();

    return (
        <div className="flex flex-col items-center py-3 text-center">
            <p className="text-sm text-gray-500">
                Select and upload your local video
            </p>

            <Button
                variant="contained"
                style={{background: 'linear-gradient(to right, #2f3542, #57606f)'}}
                className={classes.button}
                endIcon={<CloudUploadIcon/>}
                component="label"
            >
                {props.localVideoValue ? 'Choose another video' : 'Upload Video'}
                <input
                    accept=".mp4"
                    onChange={props.onChangeValue}
                    type="file"
                    hidden
                />
            </Button>
        </div>
    );
}