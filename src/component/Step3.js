import React from 'react'
import Step from "./Step";
import content from "../content/content";
import VideoPlayer from "./VideoPlayer";

export default function Step3(props) {
    return (
        <div>
            <Step name={content.steps[2].name} title={content.steps[2].title} article={content.steps[2].article}/>
            <VideoPlayer videoValue={props.videoValue} ffmpegValue={props.ffmpegValue}/>
        </div>
    );
}