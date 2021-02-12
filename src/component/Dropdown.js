import React, {useEffect, useState} from 'react';
import axios from "axios";
import FormControl from '@material-ui/core/FormControl';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const {
    REACT_APP_TRANSLATOR_ENDPOINT
} = process.env;

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function NativeSelects(props) {
    const classes = useStyles();

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const [languages, setLanguages] = useState({});
    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });

    async function getLanguagesForTranslate() {

        await axios.get(`${REACT_APP_TRANSLATOR_ENDPOINT}` + "/languages?api-version=3.0", {
            headers: { 'Accept-Language': 'en' },
            params: { 'scope': 'translation' }
        }).then(res => {
            var data = res.data.translation;

            var tmpDictionary = {};
            for (var key in data) {
                tmpDictionary[key] = data[key].name;
            }
            setLanguages(tmpDictionary);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getLanguagesForTranslate();
    }, []);

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
                    <option aria-label="None" value=""/>
                    {Object.keys(languages).map((key, index) => {
                        return (
                            <option key={index} value={key}>{languages[key]}</option>
                        );
                    })}
                </Select>
            </FormControl>

        </div>
    );
}