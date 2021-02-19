import React from 'react'
import content from "../content/content";

export default function Navbar() {

    return (
        <div style={{background:'linear-gradient(to right, ' + content.colors.prussianBlue + ', ' + content.colors.honoluluBlue + ')'}}>
            <div className="md:container mx-auto">
                <div className="w-10/12 flex items-center justify-between mx-auto text-black font-dosis mx-auto">
                    <div className="flex flex-row justify-center items-center">
                        <img src={process.env.PUBLIC_URL + '/assets/logo.svg'} className="h-10"/>
                        <span className="text-white ml-4 text-2xl">Cloud Project</span>
                    </div>
                    <div className="h-full flex flex-row justify-center items-center">
                        {content.nav.links.map((link, index) => {
                            return <span key={index} className="text-xl ml-4 p-4 text-white hover:text-black hover:bg-blue-200 cursor-pointer">{link.text}</span>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}