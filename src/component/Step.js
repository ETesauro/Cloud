import React from 'react'

export default function Step(props) {
    return (
        <div>
            <div className="text-center flex justify-center items-center mb-3 pr-4 sm:pr-0">
                    <span
                        className="text-md bg-gray-500  text-white px-8 sm:px-6 py-2 shadow text-center mb-4 mr-4 sm:mb-0 rounded-full">
                        {props.name}
                    </span>
                <h3 id="step-2" className="header_center mb-0 leading-normal ">
                    {props.title}</h3>
            </div>
            {props.article !== '' ? <article
                className="container text-sm text-grey-dark leading-normal max-w-xl px-4 mx-auto text-center mb-6">
                <p className="mb-3">
                    {props.article}
                </p>
            </article> : ''}
        </div>
    );
}