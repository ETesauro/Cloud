import React from 'react'
import content from "../content/content";
import Step from "./Step";

export default function Step4(props) {
    return (
        <div className="w-10/12 mx-auto flex flex-col justify-center items-center">
            <Step name={content.steps[3].name} title={content.steps[3].title} article={content.steps[3].article}/>

            <button className={`flex items-center
                                text-white text-xl active:bg-pink-600
                                uppercase
                                px-7 py-2 my-10
                                rounded-2xl shadow hover:shadow-md outline-none focus:outline-none
                            ${(props.subtitledVideoUrl) ? 'animate-bounce' : undefined}`}
                    style={{background: props.subtitledVideoUrl ? '#2ecc71' : '#c0392b'}}
                    disabled={!props.subtitledVideoUrl}>
                <a href={props.subtitledVideoUrl}>Download!</a>
            </button>
        </div>
    );
}