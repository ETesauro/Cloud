import React from 'react'

export default function Step(props) {
    return (
        <div className="w-full bg-gray-100 p-4">
            <div className="text-center flex justify-center items-center mb-3 pr-4 sm:pr-0">
                    <span
                        style={{background: 'linear-gradient(to right, #45aaf2, #88c8f7)'}}
                        className="text-md text-white px-8 sm:px-6 py-2 shadow text-center mb-4 mr-4 sm:mb-0 rounded-md">
                        {props.name}
                    </span>
                <h3 id="step-2" className="header_center mb-0 leading-normal font-bold text-gray-500">
                    {props.title.toUpperCase()}</h3>
            </div>
            {props.article !== '' ? <article
                className="container text-sm text-grey-dark leading-normal max-w-xl px-4 mx-auto text-center">
                <p>
                    {props.article}
                </p>
            </article> : ''}
        </div>
    );
}