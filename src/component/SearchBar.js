import React, {useState, useEffect, useRef, useCallback} from 'react'
import request from "request";
import TranslateCheck from "./TranslateCheck";
import axios from "axios";
import NativeSelects from "./Dropdown";

const accountId = "ef932204-228e-4274-ab72-1a8fec9df8b7";
const apiUrl = "https://api.videoindexer.ai";
const region = "trial";
var VIDEO_INDEXER_API_KEY = "0932f35273ec46c0bb4bedd8af660354";

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

export default function SearchBar() {

    // Scelta del video
    const [localPath, setPathVideo] = useState(""); // Forse non lo usiamo
    const [urlVideo, setUrlVideo] = useState("");
    const {v4: uuidv4} = require('uuid');

    // Open FIle Dialog
    const [image, setImage] = useState("");
    const inputFile = useRef(null);
    const handleFileUpload = e => {
        const {files} = e.target;
        if (files && files.length) {
            const filename = files[0].name;

            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];
            console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

            setImage(files[0]);
            console.log(image);
        }
    };

    // Video Indexer
    const [accountAccessToken, setAccountAccessToken] = useState("");
    const [videoInfo, setVideoInfo] = useState("");


    async function indexVideo() {
        // DONE Get Account Access Token
        let accessToken = await getVideoIndexerAccountAccessToken();
        // TODO Upload
        await uploadVideoIndexerVideo(accessToken)

        // TODO Wait to Index
    }
    async function getVideoIndexerAccountAccessToken() {
        await axios.get(apiUrl + "/Auth/" + region + "/Accounts/" + accountId + "/AccessToken", {
            params: {
                'allowEdit': true
            },
            headers: {
                'Ocp-Apim-Subscription-Key': VIDEO_INDEXER_API_KEY,
            },
        }).then(res => {
            // PROBLEMS: SETSTATE NON AGGIORNA SUBITO IL VALORE. COME FARE?
            setAccountAccessToken(res.data);
            console.log("finito: " + res.data);
        }).catch(err => {
            console.log(err);
        });

        /*
        let options = {
            method: 'GET',
            baseUrl: apiUrl,
            url: 'auth/' + region + '/Accounts/' + accountId + '/AccessToken',
            qs: {
                'allowEdit': true
            },
            headers: {
                'Ocp-Apim-Subscription-Key': VIDEO_INDEXER_API_KEY,
                'Ocp-Apim-Subscription-Region': region,
                'Content-type': 'application/json',

            },
            json: true,
        };

        request(options, function (err, res, body) {
            setAccountAccessToken(JSON.stringify(body, null, 4));
        });*/

    };
    async function uploadVideoIndexerVideo(accessToken) {
        console.log("upload: " + accessToken);
        await axios.post(apiUrl + "/" + region + "/Accounts/" + accountId + "/Videos", {}, {
            headers: {
                'Ocp-Apim-Subscription-Key': VIDEO_INDEXER_API_KEY,
                'Ocp-Apim-Subscription-Region': region,
                'Content-type': 'application/json',
                'x-ms-request-id':uuidv4().toString()
            },
            params: {
                'accessToken': accessToken,
                'name': 'video_name',
                'description': 'description_name',
                'privacy': 'private',
                'some_partition': 'some_partition',
                'videoUrl': "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
            }
        }).then(res => {
            console.log("uploadVideoIndexerVideo" + res);
        }).catch(err => {
            console.log("uploadVideoIndexerVideo" + err);
        });

        let optionsNullUrl = {
            method: 'GET',
            baseUrl: apiUrl,
            url: region + '/Accounts/' + accountId + '/Videos',
            qs: {
                'accessToken': accountAccessToken,
                'name': 'video_name',
                'description': 'description_name',
                'privacy': 'private',
                'some_partition': 'some_partition',
            },
            headers: {
                'Ocp-Apim-Subscription-Key': VIDEO_INDEXER_API_KEY,
                'Ocp-Apim-Subscription-Region': region,
                'Content-type': 'application/json',
            },
            json: true,
        };

        let optionsUrl = {
            method: 'GET',
            baseUrl: apiUrl,
            url: region + '/Accounts/' + accountId + '/Videos',
            qs: {
                'accessToken': accountAccessToken,
                'name': 'video_name',
                'description': 'description_name',
                'privacy': 'private',
                'some_partition': 'some_partition',
                'videoUrl': urlVideo
            },
            headers: {
                'Ocp-Apim-Subscription-Key': VIDEO_INDEXER_API_KEY,
                'Ocp-Apim-Subscription-Region': region,
                'Content-type': 'application/json',

            },
            json: true,
        };

        /*request(optionsNullUrl, function (err, res, body) {
            setAccountAccessToken(JSON.stringify(body, null, 4));
        });*/
    };
    async function GetVideoIndexerVideoAccessTokenAsync() {

    }
    async function WaitToIndexVideoAsync() {

    }

    // Translator
    const [languages, setLanguages] = useState({});
    const [language, setLanguage] = useState("");

    async function getLanguagesForTranslate() {
        var translatorEndpoint = "https://api.cognitive.microsofttranslator.com";
        var route = "/languages?api-version=3.0";

        await axios.get(translatorEndpoint + route, {
            headers: {
                'Accept-Language': 'en'
            },
            params: {
                'scope': 'translation'
            }
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

    const handleLanguageChange = e => {
        setLanguage(e.target.value);
        console.log("target: " + e.target.value);
    }

    // DEBUG
    useEffect(() => {
        getLanguagesForTranslate();
        //setVideoInfo(content.translationCheck.mockText);
    }, []);

    return (
        <div className="border-t border-gray-200 container w-10/12 mx-auto">

            {/*
            <div className="mt-10 sm:mt-0 bg-blue-100">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Step to indexing video</h3>
                            <ol>
                                <li>Step 1 - Copy the video URL or choose local video</li>
                                <li>Step 2 - Choose subtitles language</li>
                                <li>Step 3 - Start the indexing process and waiting for video</li>
                                <li>Step 4 - View the indexed video with subtitles</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            */}

            <h1>Account Access Token: {accountAccessToken}</h1>
            <h1>Language: {language}</h1>

            {/* Step 1*/}
            <div className="mt-5">
                <div className="text-center flex justify-center items-center mb-3 pr-4 sm:pr-0">
                    <span
                        className="text-md bg-gray-500 text-white px-8 sm:px-6 py-2 shadow text-center mb-4 mr-4 sm:mb-0 rounded-full">
                    Step 1
                    </span>
                    <h3 id="step-1" className="header_center mb-0 leading-normal ">
                        Paste the video URL or choose local video and select the target language</h3>
                </div>
                {/*<article
                    className="container text-sm text-grey-dark leading-normal max-w-xl px-4 mx-auto text-center mb-6">
                    <p className="mb-3">
                        While searching on the video Webcasterfeed.com you got some video by which you actually wanted
                        to
                        have mp4 of.
                        just copy the url of that page which contain the media by either copying from url bar.
                        I know its pretty easy you can move to next step, just some keyboard shortcuts.
                        Press <b className="mx-1">(CTRL/Command + L)</b> for selecting url bar &amp; Press <b
                        className="mx-1">(CTRL/Command + C)</b>
                        for copying the url.
                    </p>
                </article>*/}

                <div className="my-4 flex flex-col w-10/12 mx-auto items-center">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form action="#" method="POST">
                            <div className="shadow-md sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                    {/*Url video*/}
                                    <div className="mt-2 flex flex-col md:flex-row items-center">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label htmlFor="company_website"
                                                   className="block text-sm font-medium text-gray-700">
                                                Url Video
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <input type="text" name="company_website" id="company_website"
                                                       className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                       onChange={event => setUrlVideo(event.target.value)}
                                                       placeholder="www.example.com" />
                                            </div>
                                        </div>
                                    </div>

                                    <p className="flex flex-row mx-auto justify-center">Or</p>

                                    {/*Bottone per il file locale*/}
                                    <div>
                                        <div className="flex flex-col items-center">
                                            <p className="text-sm text-gray-500">
                                                Select and upload your local video
                                            </p>
                                            <button
                                                className="bg-blue-300 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 mt-3 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ml-5"
                                                type="button" style={{transition: "all .15s ease"}}>

                                                <div>
                                                    <input
                                                        style={{display: "none"}}
                                                        //accept=".zip,.rar"
                                                        ref={inputFile}
                                                        onChange={handleFileUpload}
                                                        type="file"
                                                    />
                                                    <input type="file" ref={inputFile}
                                                           onChange={event => setPathVideo(event.target.value)}/>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    {/*Dropdown languages*/}
                                    <div>
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="text-sm text-gray-500">
                                                Select the target language
                                            </p>

                                            <NativeSelects languages={languages} onChangeValue={handleLanguageChange}/>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>

                    {/*Bottone avvia*/}
                    <button
                        className="bg-blue-300 text-white text-xl active:bg-pink-600 font-bold uppercase px-4 mt-3 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ml-5 hover:bg-blue-400"
                        onClick={indexVideo}>
                        Start
                    </button>
                </div>
            </div>

            <LineSeparator/>

            {/* Step 2*/}
            <div>
                <div className="text-center flex justify-center items-center mb-3 pr-4 sm:pr-0">
                    <span
                        className="text-md bg-gray-500  text-white px-8 sm:px-6 py-2 shadow text-center mb-4 mr-4 sm:mb-0 rounded-full">
                    Step 2
                    </span>
                    <h3 id="step-2" className="header_center mb-0 leading-normal ">
                        Choose subtitles languages</h3>
                </div>
                <article
                    className="container text-sm text-grey-dark leading-normal max-w-xl px-4 mx-auto text-center mb-6">
                    <p className="mb-3">
                        While searching on the video Webcasterfeed.com you got some video by which you actually wanted
                        to
                        have mp4 of.
                        just copy the url of that page which contain the media by either copying from url bar.
                        I know its pretty easy you can move to next step, just some keyboard shortcuts.
                        Press <b className="mx-1">(CTRL/Command + L)</b> for selecting url bar &amp; Press <b
                        className="mx-1">(CTRL/Command + C)</b>
                        for copying the url.
                    </p>
                </article>

                <TranslateCheck videoInfo={videoInfo}/>
            </div>

            <LineSeparator/>

            {/* Step 3*/}
            <div>
                <div className="text-center flex justify-center items-center mb-3 pr-4 sm:pr-0">
<span className="text-md bg-gray-500  text-white px-8 sm:px-6 py-2 shadow text-center mb-4 mr-4 sm:mb-0 rounded-full">
Step 3
</span>
                    <h3 id="step-3" className="header_center mb-0 leading-normal ">
                        Start the indexing process and waiting for</h3>
                </div>
                <article
                    className="container text-sm text-grey-dark leading-normal max-w-xl px-4 mx-auto text-center mb-6">
                    <p className="mb-3">
                        While searching on the video Webcasterfeed.com you got some video by which you actually wanted
                        to
                        have mp4 of.
                        just copy the url of that page which contain the media by either copying from url bar.
                        I know its pretty easy you can move to next step, just some keyboard shortcuts.
                        Press <b className="mx-1">(CTRL/Command + L)</b> for selecting url bar &amp; Press <b
                        className="mx-1">(CTRL/Command + C)</b>
                        for copying the url.
                    </p>
                </article>
            </div>

            <LineSeparator/>

            {/* Step 4 */}
            <div>
                <div className="text-center flex justify-center items-center mb-3 pr-4 sm:pr-0">
<span className="text-md bg-gray-500  text-white px-8 sm:px-6 py-2 shadow text-center mb-4 mr-4 sm:mb-0 rounded-full">
Step 4
</span>
                    <h3 id="step-4" className="header_center mb-0 leading-normal ">
                        View the indexed video with subtitles </h3>
                </div>
                <article
                    className="container text-sm text-grey-dark leading-normal max-w-xl px-4 mx-auto text-center mb-6">
                    <p className="mb-3">
                        While searching on the video Webcasterfeed.com you got some video by which you actually wanted
                        to
                        have mp4 of.
                        just copy the url of that page which contain the media by either copying from url bar.
                        I know its pretty easy you can move to next step, just some keyboard shortcuts.
                        Press <b className="mx-1">(CTRL/Command + L)</b> for selecting url bar &amp; Press <b
                        className="mx-1">(CTRL/Command + C)</b>
                        for copying the url.
                    </p>
                </article>
            </div>

        </div>
    );

}