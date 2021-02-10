import React from 'react'

export default function Navbar() {
    return (
        <div style={{
            backgroundColor: "#091c29"
        }}>
            <div className="flex items-center justify-between w-10/12 mx-auto py-3 text-white font-dosis">
                <h1 className="text-3xl font-bold">
                    Logo {' '}
                    <span className="w-3 h-3 bg-red-500 inline-block rounded-full"/>
                </h1>
            </div>
        </div>
    );
}