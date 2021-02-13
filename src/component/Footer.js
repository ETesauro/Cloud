import React from 'react'

export default function Footer() {

    return (
        <div>
            <nav id="footer" className="bg-gray-500">

                <div className="container mx-auto pt-8 pb-4">

                    <div className="flex flex-wrap overflow-hidden sm:-mx-1 md:-mx-px lg:-mx-2 xl:-mx-2">

                        <div
                            className="w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
                                <img src={process.env.PUBLIC_URL + '/assets/logo.svg'} className="w-1/2 py-3"/>
                        </div>

                        <div
                            className="w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">


                            <h4 className="text-white">Important</h4>
                            <ul className="nav navbar-nav">
                                <li id="navi-2" className="leading-7 text-sm">
                                    <a className="text-white underline text-small" href="#">
                                        Page 1 </a>
                                </li>
                                <li id="navi-1" className="leading-7 text-sm"><a
                                    className="text-white underline text-small" href="#">Page 2</a></li>
                            </ul>


                        </div>

                        <div
                            className="w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
                            <h4 className="text-white">Info</h4>
                            <ul className="">
                                <li id="navi-2" className="leading-7 text-sm">
                                    <a className="text-white underline text-small" href="#">
                                        Page 1 </a>
                                </li>
                                <li id="navi-1" className="leading-7 text-sm"><a
                                    className="text-white underline text-small" href="#">Page 2</a></li>
                            </ul>
                        </div>

                        <div
                            className="w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">

                            <h4 className="text-white">Products</h4>
                            <ul className="">
                                <li id="navi-2" className="leading-7 text-sm">
                                    <a className="text-white underline text-small" href="#">
                                        Page 1 </a>
                                </li>
                                <li id="navi-1" className="leading-7 text-sm"><a
                                    className="text-white underline text-small" href="#">Page 2</a></li>
                            </ul>
                        </div>

                    </div>

                    <div className="pt-4 md:flex md:items-center md:justify-center">
                        <ul className="">
                            <li className="md:mx-2 md:inline leading-7 text-sm" id="footer-navi-2"><a
                                className="text-white underline text-small" href="#">Disclaimer</a></li>
                            <li className="md:mx-2 md:inline leading-7 text-sm" id="footer-navi-2"><a
                                className="text-white underline text-small" href="#">Cookie policy</a></li>
                            <li className="md:mx-2 md:inline leading-7 text-sm" id="footer-navi-2"><a
                                className="text-white underline text-small" href="#">Privacy</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}