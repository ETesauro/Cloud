import React, {useEffect, useState} from 'react'

export default function ProgressBar(props) {

    const [progress, setProgress] = useState("0%");

    useEffect(() => {
        if(!(props.processingProgress === "")) {
            setProgress(props.processingProgress);
        }
    }, [props.processingProgress]);

    return (
        <div className="mt-5">
            <div className="flex mb-2 items-center justify-between">
                <div>
                    <span
                        className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${props.stateValue === "Processed" ? "text-green-600 bg-green-200" : "text-blue-600 bg-blue-200"}`}>
                        {props.stateValue === "" ? "Progress" : props.stateValue}
                    </span>
                </div>
                <div className="text-right">
                    <span
                        className={`text-xs font-semibold inline-block ${props.stateValue === "Processed" ? "text-green-600" : "text-blue-600"}`}>
                        {progress === "" ? "0%" : progress}
                    </span>
                </div>
            </div>
            <div
                className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${props.stateValue === "Processed" ? "bg-green-200" : "bg-blue-200"}`}>
                <div style={{width: progress === "" ? "0%" : progress}}
                     className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${props.stateValue === "Processed" ? "bg-green-500" : "bg-blue-500 shim-blue"}`}>
                </div>
            </div>
        </div>
    );
}