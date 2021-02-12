import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {FormHelperText, NativeSelect} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

/*export default function LanguageDropdown(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        age: 'it',
        name: 'italian',
    });

    useEffect( () => {
        Object.keys(props.languages).map((key, index) => {
            //console.log(key);
        })
    }, [props.languages])

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Language</InputLabel>
            <Select
                native
                value={state.age}
                onChange={handleChange}
                inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                }}
            >
                {Object.keys(props.languages).map((key, index) => {
                    return(
                      <option key={index} value={key}>{props.languages[key]}</option>
                    );
                })}

                {console.log(state.age, state.name)}
            </Select>
        </FormControl>
    );
}*/

export default function NativeSelects(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                <Select
                    native
                    value={state.age}
                    onChange={props.onChangeValue}
                    inputProps={{
                        name: 'age',
                        id: 'age-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    {Object.keys(props.languages).map((key, index) => {
                        return(
                            <option key={index} value={key}>{props.languages[key]}</option>
                        );
                    })}
                </Select>
            </FormControl>

        </div>
    );
}