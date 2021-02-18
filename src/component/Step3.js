import React, {useEffect, useState} from 'react'
import Step from "./Step";
import content from "../content/content";
import axios from "axios";
import VideoPlaceholder from "./VideoPlaceholder";
import SyncLoader from 'react-spinners/SyncLoader'

export default function Step3(props) {

    const [isVideoConverting, setIsVideoConverting] = useState(false);

    useEffect(() => {
        if (props.translatedVideoInfo) {
            getSubtitledVideo();
        }
    }, [props.translatedVideoInfo])

    async function getSubtitledVideo() {
        console.log("Richiedo il video sottotitolato");

        setIsVideoConverting(true);
        let subtitledVideo;
        try {
            const formData = new FormData();
            formData.append('translatedText', JSON.stringify(props.translatedVideoInfo));
            formData.append('uploadedVideo', props.videoValue);

            subtitledVideo = await axios.post("https://progettocloudfunctionapp.azurewebsites.net/api/createSubtitledVideo?code=NqN6rmmA3Lkr2Bmudb2dzOAr0INzFmB/2KncHLwShmqhG0jcBcwChQ==", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
            });

            console.log("subtitledVideo", subtitledVideo);
            props.setSubtitledVideoUrl(subtitledVideo.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-10/12 mx-auto">
            <Step name={content.steps[2].name} title={content.steps[2].title} article={content.steps[2].article}/>

            <div
                className="grid grid-cols-3 gap-4 w-full shadow-md sm:rounded-md sm:overflow-hidden p-4 items-center bg-gray-50"
                style={{height: '30rem'}}>
                <div className="p-8 pt-0 col-span-3 mx-auto h-full flex justify-center items-center w-2/3">
                    {isVideoConverting ?
                        props.subtitledVideoUrl ?
                            <video src={props.subtitledVideoUrl} controls/>
                            :
                            <SyncLoader size={15} color={'#43abf2'} loading={!props.subtitledVideoUrl}/>
                        :
                        <VideoPlaceholder/>
                    }
                </div>
            </div>
        </div>
    );
}