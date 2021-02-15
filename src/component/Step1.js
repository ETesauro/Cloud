import React, {useEffect, useState} from 'react'
import Step from "./Step";
import content from "../content/content";
import SelectFileButton from "./SelectFileButton";
import NativeSelects from "./Dropdown";
import axios from "axios";
import {sleep} from "../utils/utils";
import VideoPlaceholder from "./VideoPlaceholder";
import {Link as ScrollLink} from 'react-scroll'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import BlockIcon from '@material-ui/icons/Block';
import Swal from "sweetalert2";

const {
    REACT_APP_VIDEOINDEXER_API_KEY,
    REACT_APP_VIDEOINDEXER_ACCOUNT_ID,
    REACT_APP_VIDEOINDEXER_ENDPOINT,
    REACT_APP_VIDEOINDEXER_REGION
} = process.env;

const {v4: uuidv4} = require('uuid');

export default function Step1(props) {
    // Scelta del video
    const [urlVideo, setUrlVideo] = useState(""); // Da spostare nel padre (Body) se lo usiamo
    const [error, setError] = useState();

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: error.title,
                text: error.text
            });
            props.onIndexedFinish(0);
        }
    }, [error]);

    async function indexVideo() {
        // GET ACCOUNT ACCESS TOKEN
        let tokenResponse;
        try {
            tokenResponse = await axios.get(`${REACT_APP_VIDEOINDEXER_ENDPOINT}/Auth/${REACT_APP_VIDEOINDEXER_REGION}/Accounts/${REACT_APP_VIDEOINDEXER_ACCOUNT_ID}/AccessToken`, {
                params: {
                    'allowEdit': true
                },
                headers: {
                    'Ocp-Apim-Subscription-Key': `${REACT_APP_VIDEOINDEXER_API_KEY}`,
                },
            })
        } catch (err) {
            setError({
                title: 'Oops...',
                text: 'There was a problem retrieving the account access token.'
            });
            return;
        }
        console.log("token: " + tokenResponse.data);


        // UPLOAD VIDEO
        let videoUploadResponse;
        try {
            const formData = new FormData();
            formData.append('data', props.localVideoFormDataValue);

            videoUploadResponse = await axios.post(`${REACT_APP_VIDEOINDEXER_ENDPOINT}/${REACT_APP_VIDEOINDEXER_REGION}/Accounts/${REACT_APP_VIDEOINDEXER_ACCOUNT_ID}/Videos`, formData, {
                headers: {
                    'Ocp-Apim-Subscription-Key': `${REACT_APP_VIDEOINDEXER_API_KEY}`,
                    'Ocp-Apim-Subscription-Region': `${REACT_APP_VIDEOINDEXER_REGION}`,
                    'Content-type': 'application/json',
                    'x-ms-request-id': uuidv4().toString()
                },
                params: {
                    'accessToken': tokenResponse.data,
                    'name': props.localVideoValue.name,
                    'description': 'description_name',
                    'privacy': 'private',
                    'some_partition': 'some_partition'
                }
            })
        } catch (err) {
            setError({
                title: 'Oops...',
                text: 'There was a problem during the video\'s upload.'
            });
            return;
        }
        console.log("videoUploadResponse" + videoUploadResponse.data);


        // GET VIDEO ACCESS TOKEN
        let videoAccessTokenResponse;
        try {
            videoAccessTokenResponse = await axios.get(`${REACT_APP_VIDEOINDEXER_ENDPOINT}/Auth/${REACT_APP_VIDEOINDEXER_REGION}/Accounts/${REACT_APP_VIDEOINDEXER_ACCOUNT_ID}/Videos/` + videoUploadResponse.data.id + '/AccessToken', {
                //const videoAccessTokenResponse = await axios.get(apiUrl + "/Auth/" + region + "/Accounts/" + accountId + "/Videos/" + videoUploadResponse.data.id + "/AccessToken", {
                params: {
                    'allowEdit': true
                },
                headers: {
                    'Ocp-Apim-Subscription-Key': `${REACT_APP_VIDEOINDEXER_API_KEY}`
                }
            })
        } catch (err) {
            setError({
                title: 'Oops...',
                text: 'There was a problem retrieving the video access token.'
            });
            return;
        }
        console.log("videoAccessTokenResponse: " + videoAccessTokenResponse.data);


        // WAIT TO INDEX VIDEO
        while (true) {
            await sleep(3000);

            let waitToIndexResponse;
            try {
                waitToIndexResponse = await axios.get(`${REACT_APP_VIDEOINDEXER_ENDPOINT}/${REACT_APP_VIDEOINDEXER_REGION}/Accounts/${REACT_APP_VIDEOINDEXER_ACCOUNT_ID}/Videos/` + videoUploadResponse.data.id + '/Index', {
                    params: {
                        'accessToken': videoAccessTokenResponse.data,
                        'language': 'English'
                    }
                })
            } catch (err) {
                setError({
                    title: 'Oops...',
                    text: 'There was a problem retrieving the video\'s indexing process.'
                });
                return;
            }

            // Aggiorno videoInfo per aggiornare ogni volta la ProgressBar
            props.onIndexedFinish(waitToIndexResponse.data);

            if (waitToIndexResponse.data.state !== "Processing" && waitToIndexResponse.data.state !== "Uploaded") {
                props.onIndexedFinish(waitToIndexResponse.data);
                return;
            }
        }
    }

    return (
        <div className="w-10/12 flex justify-center items-center mx-auto"
             style={{'minHeight': '90vh'}}>

            <div className="w-full flex flex-col items-center justify-around"
                 style={{'minHeight': '90vh'}}>

                {/* Step title */}
                <Step name={content.steps[0].name} title={content.steps[0].title}
                      article={content.steps[0].article}/>

                {/* Griglia */}
                <div className="flex flex-col mx-auto items-center w-full">
                    <div
                        className="grid grid-cols-3 gap-4 w-full shadow-md sm:rounded-md sm:overflow-hidden p-4 items-center bg-gray-50"
                        style={{height: '30rem'}}>

                        {/* Prima colonna: Upload video e scelta lingua */}
                        <form action="#" method="POST"
                              className="h-full flex flex-col items-center justify-center px-4 py-7 space-y-6 sm:p-6">

                            {/*Url video*/}
                            {/*
                                        <div className="mt-2 flex flex-col md:flex-row items-center justify-center">
                                            <TextField id="outlined-basic" label="URL Video" variant="outlined"
                                                       onChange={event => setUrlVideo(event.target.value)} fullWidth/>
                                        </div>

                                    <p className="flex flex-row mx-auto justify-center">Or</p>
                                    */}

                            {/*Bottone per il file locale*/}
                            <SelectFileButton onChangeValue={props.onFileChangeValue}
                                              localVideoValue={props.localVideoValue}/>

                            {/*Dropdown languages*/}
                            <div className="flex flex-col items-center justify-center text-center">
                                <p className="text-sm text-gray-500">Select the target language</p>
                                <NativeSelects onChangeValue={props.onLanguageChangeValue}
                                               languageValue={props.languageValue}/>
                            </div>
                        </form>

                        {/* Seconda e terza colonna: Anteprima video */}
                        <div className="p-10 col-span-2 mx-auto w-full h-full flex justify-center">
                            {props.localVideoValue ?
                                <video
                                    className="rounded-lg"
                                    controls
                                    src={URL.createObjectURL(props.localVideoValue)}>
                                </video>
                                :
                                <VideoPlaceholder/>
                            }
                        </div>

                    </div>
                </div>

                {/* Start Translation Button */}
                <div className="flex flex-col mx-auto items-center justify-center">
                    {/*Bottone avvia*/}
                    <ScrollLink to="step2" smooth={true} duration={2000} offset={-50}>
                        <button
                            className={`flex items-center
                                text-white text-xl active:bg-pink-600
                                font-bold uppercase
                                px-7 py-2
                                rounded-2xl shadow hover:shadow-md outline-none focus:outline-none
                            ${(props.localVideoValue && props.languageValue.code !== '') ? 'animate-bounce' : undefined}`}
                            style={{background: (props.localVideoValue && props.languageValue.code !== '') ? '#2ecc71' : '#c0392b',}}
                            disabled={!props.localVideoValue || props.languageValue.code === ''}
                            onClick={(props.localVideoValue && props.languageValue.code !== '') ? indexVideo : undefined}>
                            Start Translation&nbsp;{props.localVideoValue && props.languageValue.code !== '' ?
                            <KeyboardArrowDownIcon/> : <BlockIcon/>}
                        </button>
                    </ScrollLink>
                </div>
            </div>

        </div>
    );
}