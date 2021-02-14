import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'

export default function Loading(props) {
    return (
        <div className="flex items-center justify-center h-screen">
            <ScaleLoader size={30} color={'#43abf2'} loading={props.isLoading}/>
        </div>
    );
}