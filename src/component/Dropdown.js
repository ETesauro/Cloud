import React, {useEffect, useState} from 'react';
import axios from "axios";
import FormControl from '@material-ui/core/FormControl';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Swal from "sweetalert2";

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
    const [languages, setLanguages] = useState({});

    async function getLanguagesForTranslate() {

        await axios.get(`${REACT_APP_TRANSLATOR_ENDPOINT}` + "/languages?api-version=3.0", {
            headers: {'Accept-Language': 'en'},
            params: {'scope': 'translation'}
        }).then(res => {
            var data = res.data.translation;

            var tmpDictionary = {};
            for (var key in data) {
                tmpDictionary[key] = data[key].name;
            }
            setLanguages(tmpDictionary);
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'There was a problem getting the languages list.'
            });
            console.log(err);
        });
    }

    useEffect(() => {
        getLanguagesForTranslate();
    }, []);

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Language</InputLabel>
                <Select
                    native
                    value={languages[props.languageValue]}
                    onChange={props.onChangeValue}
                    inputProps={{
                        id: 'age-native-simple',
                        name: 'code'
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