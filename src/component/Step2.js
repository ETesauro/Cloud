import React from 'react'
import Step from "./Step";
import content from "../content/content";
import TranslateCheck from "./TranslateCheck";
import ProgressBar from "./ProgressBar";

export default function Step2(props) {
    return (
        <div className="w-10/12 mx-auto mt-5" id="step2">

            {/* Step 2*/}
            <Step name={content.steps[1].name} title={content.steps[1].title} article={content.steps[1].article}/>

            <ProgressBar
                stateValue={props.videoInfoValue.videos === undefined ? '' : props.videoInfoValue.state}
                processingProgress={props.videoInfoValue.videos === undefined ? '' : props.videoInfoValue.videos[0].processingProgress}/>

            <TranslateCheck videoInfo={props.videoInfoValue} selectedLanguage={props.languageValue}/>
        </div>
    );
}