import React from 'react'
import content from "../content/content";
import Step from "./Step";
import GetAppIcon from '@material-ui/icons/GetApp';

export default function Step4(props) {
    return (
        <div className="w-10/12 mx-auto flex flex-col justify-center items-center">
            <Step name={content.steps[3].name} title={content.steps[3].title} article={content.steps[3].article}/>

            <button className={`flex items-center
                                text-white text-xl active:bg-pink-600
                                uppercase
                                px-4 py-2 my-10
                                rounded-xl shadow hover:shadow-md outline-none focus:outline-none
                            ${(props.subtitledVideoUrl) ? 'animate-bounce' : undefined}`}
                    style={{background: props.subtitledVideoUrl ? 'rgba(46,204,113,1)' : 'rgba(192,57,43, 0.6)'}}
                    disabled={!props.subtitledVideoUrl}>
                <a href={props.subtitledVideoUrl} className="flex justify-around items-center">
                    Download! <GetAppIcon />
                </a>
            </button>
        </div>
    );
}