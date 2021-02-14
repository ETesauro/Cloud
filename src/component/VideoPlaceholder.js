import React from 'react'

export default function VideoPlaceholder() {
    return (
        <div
            className="w-full h-full bg-gray-400 bg-opacity-75 rounded-lg overflow-hidden text-center flex flex-col justify-center items-center">
            <img src={process.env.PUBLIC_URL + '/assets/placeholder.svg'} className="object-scale-down h-1/2"/>
        </div>
    );
}