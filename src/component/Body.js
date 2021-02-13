import React, {useState, useEffect, useRef, useCallback} from 'react'
import axios from "axios";
import content from "../content/content";
import TranslateCheck from "./TranslateCheck";
import NativeSelects from "./Dropdown";
import Step from "./Step";
import SelectFileButton from "./SelectFileButton";
import {sleep} from "../utils/utils";
import TextField from '@material-ui/core/TextField';
import VideoPlayer from "./VideoPlayer";
import Loading from "./Loading";
import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';

const {
    REACT_APP_VIDEOINDEXER_API_KEY,
    REACT_APP_VIDEOINDEXER_ACCOUNT_ID,
    REACT_APP_VIDEOINDEXER_ENDPOINT,
    REACT_APP_VIDEOINDEXER_REGION
} = process.env;

const ffmpeg = createFFmpeg({log: true});

// Barra di separazione
export function LineSeparator() {
    return (
        <div aria-hidden="true">
            <div className="py-5">
                <div className="border-t border-gray-200"></div>
            </div>
        </div>
    );
}

export default function Body() {

    //FFMpeg
    const [ready, setReady] = useState(false);
    useEffect(() => {
        load();
    }, [])
    const load = async () => {
        await ffmpeg.load();
        setReady(true);
    }

    // Scelta del video
    const [localVideo, setLocalVideo] = useState();

    const [urlVideo, setUrlVideo] = useState("");
    const {v4: uuidv4} = require('uuid');

    // Video Indexer
    const [videoInfo, setVideoInfo] = useState("");

    async function indexVideo() {

        // GET ACCOUNT ACCESS TOKEN
        const tokenResponse = await axios.get(`${REACT_APP_VIDEOINDEXER_ENDPOINT}/Auth/${REACT_APP_VIDEOINDEXER_REGION}/Accounts/${REACT_APP_VIDEOINDEXER_ACCOUNT_ID}/AccessToken`, {
            params: {
                'allowEdit': true
            },
            headers: {
                'Ocp-Apim-Subscription-Key': `${REACT_APP_VIDEOINDEXER_API_KEY}`,
            },
        })
        console.log("token: " + tokenResponse.data);


        // UPLOAD VIDEO
        const videoUploadResponse = await axios.post(`${REACT_APP_VIDEOINDEXER_ENDPOINT}/${REACT_APP_VIDEOINDEXER_REGION}/Accounts/${REACT_APP_VIDEOINDEXER_ACCOUNT_ID}/Videos`, {}, {
            headers: {
                'Ocp-Apim-Subscription-Key': `${REACT_APP_VIDEOINDEXER_API_KEY}`,
                'Ocp-Apim-Subscription-Region': `${REACT_APP_VIDEOINDEXER_REGION}`,
                'Content-type': 'application/json',
                'x-ms-request-id': uuidv4().toString()
            },
            params: {
                'accessToken': tokenResponse.data,
                'name': 'video_name',
                'description': 'description_name',
                'privacy': 'private',
                'some_partition': 'some_partition',
                'videoUrl': urlVideo
            }
        })
        console.log("videoUploadResponse" + videoUploadResponse.data);


        // GET VIDEO ACCESS TOKEN
        const videoAccessTokenResponse = await axios.get(`${REACT_APP_VIDEOINDEXER_ENDPOINT}/Auth/${REACT_APP_VIDEOINDEXER_REGION}/Accounts/${REACT_APP_VIDEOINDEXER_ACCOUNT_ID}/Videos/` + videoUploadResponse.data.id + '/AccessToken', {
            //const videoAccessTokenResponse = await axios.get(apiUrl + "/Auth/" + region + "/Accounts/" + accountId + "/Videos/" + videoUploadResponse.data.id + "/AccessToken", {
            params: {
                'allowEdit': true
            },
            headers: {
                'Ocp-Apim-Subscription-Key': `${REACT_APP_VIDEOINDEXER_API_KEY}`
            }
        })
        console.log("videoAccessTokenResponse: " + videoAccessTokenResponse.data);


        // WAIT TO INDEX VIDEO
        while (true) {
            await sleep(3000);

            const waitToIndexResponse = await axios.get(`${REACT_APP_VIDEOINDEXER_ENDPOINT}/${REACT_APP_VIDEOINDEXER_REGION}/Accounts/${REACT_APP_VIDEOINDEXER_ACCOUNT_ID}/Videos/` + videoUploadResponse.data.id + '/Index', {
                params: {
                    'accessToken': videoAccessTokenResponse.data,
                    'language': 'English'
                }
            })

            // Aggiorno videoInfo per aggiornare ogni volta la ProgressBar
            setVideoInfo(waitToIndexResponse.data);

            if (waitToIndexResponse.data.state !== "Processing" && waitToIndexResponse.data.state !== "Uploaded") {
                setVideoInfo(waitToIndexResponse.data);
                return;
            }
        }
    }

    // Translator
    const [language, setLanguage] = useState({
        code: '',
        language: ''
    });
    const handleLanguageChange = e => {
        const code = e.target.name;
        setLanguage({
            ...language,
            [code]: e.target.value
        });
        console.log("target: " + e.target.value);
    }

    return ready ? (
            <div className="border-t border-gray-200 container w-10/12 mx-auto">

                {localVideo &&
                <h1>{localVideo.name}</h1>}

                {/* Step 1*/}
                <div className="mt-4">
                    <Step name={content.steps[0].name} title={content.steps[0].title}
                          article={content.steps[0].article}/>

                    {/* Form */}
                    <div className="mt-5 flex flex-col w-10/12 mx-auto items-center">
                        <div className="mt-5 w-10/12 md:mt-0 md:col-span-2">
                            <form action="#" method="POST">
                                <div className="shadow-md sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                        {/*Url video*/}
                                        <div className="mt-2 flex flex-col md:flex-row items-center justify-center">
                                            <TextField id="outlined-basic" label="URL Video" variant="outlined"
                                                       onChange={event => setUrlVideo(event.target.value)} fullWidth/>
                                        </div>

                                        <p className="flex flex-row mx-auto justify-center">Or</p>

                                        {/*Bottone per il file locale*/}
                                        <SelectFileButton onChangeValue={(e) => {
                                            setLocalVideo(e.target.files?.item(0));
                                            console.log(e.target.files?.item(0).name);
                                        }}/>

                                        {/*Dropdown languages*/}
                                        <div>
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="text-sm text-gray-500">Select the target language</p>
                                                <NativeSelects onChangeValue={handleLanguageChange}
                                                               languageValue={language}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/*Bottone avvia*/}
                        <button
                            className="bg-blue-300 text-white text-xl active:bg-pink-600 font-bold uppercase px-4 py-2 mt-5 rounded-full shadow hover:shadow-md outline-none focus:outline-none hover:bg-blue-400"
                            onClick={indexVideo}>
                            Start
                        </button>
                    </div>
                </div>

                <LineSeparator/>

                {/* Step 2*/}
                <Step name={content.steps[1].name} title={content.steps[1].title} article={content.steps[1].article}/>
                <TranslateCheck videoInfo={videoInfo} selectedLanguage={language}/>

                <LineSeparator/>

                {/* Step 3*/}
                <Step name={content.steps[2].name} title={content.steps[2].title} article={content.steps[2].article}/>
                <VideoPlayer videoValue={localVideo} ffmpegValue={ffmpeg}/>

                <LineSeparator/>

                {/* Step 4 */}
                <Step name={content.steps[3].name} title={content.steps[3].title} article={content.steps[3].article}/>

            </div>
        )
        :
        <Loading/>;

}