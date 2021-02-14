import React, {useState} from 'react'
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const {
    REACT_APP_VIDEOINDEXER_API_KEY,
    REACT_APP_VIDEOINDEXER_ACCOUNT_ID,
    REACT_APP_VIDEOINDEXER_ENDPOINT,
    REACT_APP_VIDEOINDEXER_REGION
} = process.env;

// Barra di separazione
export function LineSeparator(props) {
    return (
        <div aria-hidden="true" id={props.idValue}>
            <div className="py-10">
                <div className="border-t border-gray-200"></div>
            </div>
        </div>
    );
}

export default function Body(props) {
    // Video Indexer
    const [localVideo, setLocalVideo] = useState();
    const [videoInfo, setVideoInfo] = useState("");

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
    const handleLocalFileChange = e => {
        setLocalVideo(e.target.files?.item(0))
        console.log(URL.createObjectURL(e.target.files?.item(0)));
    }

    return (
        <div className="md:container mx-auto">

            <Step1 languageValue={language} onLanguageChangeValue={handleLanguageChange}
                   onFileChangeValue={handleLocalFileChange} onIndexedFinish={setVideoInfo}
                   localVideoValue={localVideo} ffmpegValue={props.ffmpegValue}/>

            <Step2 videoInfoValue={videoInfo} languageValue={language}/>

            <LineSeparator idValue="step3"/>

            <Step3 videoValue={localVideo} ffmpegValue={props.ffmpegValue}/>

            <LineSeparator idValue="step4"/>

            <Step4/>

        </div>
    );
}