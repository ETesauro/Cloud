import React, {useState, useEffect, useRef} from 'react'
import ImageUpload from "./OpenFileDialog";
import request from "request";

const accountId = "72bbde23-72dd-4c04-bbc4-85e2fffae566";
const apiUrl = "https://api.videoindexer.ai";
const region = "trial";
var VIDEO_INDEXER_API_KEY = "7ccf078ebdf14a769296b884345df84d";

export default function SearchBar() {
    const [accountAccessToken, setAccountAccessToken] = useState("");

    const [localPath,setPathVideo] = useState("");
    console.log(localPath);
    const [urlVideo,setUrlVideo] = useState("");

    const [image, setImage] = useState("");
    const inputFile = useRef(null);
    const handleFileUpload = e => {
        const { files } = e.target;
        if (files && files.length) {
            const filename = files[0].name;

            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];
            console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

            setImage(files[0]);
            console.log(image);
        }
    };

    useEffect(() => {
        console.log("ciao");
    }, []);

    function getAccessToken() {
        let options = {
            method: 'GET',
            baseUrl: apiUrl,
            url: 'auth/' + region + '/Accounts/' + accountId + '/AccessToken',
            qs: {
                'allowEdit': true
            },
            headers: {
                    'Ocp-Apim-Subscription-Key': VIDEO_INDEXER_API_KEY,
                    'Ocp-Apim-Subscription-Region': region,
                    'Content-type': 'application/json',

            },
            json: true,
        };

        request(options, function (err, res, body) {
            setAccountAccessToken(JSON.stringify(body, null, 4));
        });
    };
    function uploadVideoIndexerVideoAsync(){

        let optionsNullUrl = {
            method: 'GET',
            baseUrl: apiUrl,
            url: region+'/Accounts/' + accountId + '/Videos',
            qs: {
                'accessToken': accountAccessToken,
                'name':'video_name',
                'description':'description_name',
                'privacy':'private',
                'some_partition':'some_partition',
            },
            headers: {
                'Ocp-Apim-Subscription-Key': VIDEO_INDEXER_API_KEY,
                'Ocp-Apim-Subscription-Region': region,
                'Content-type': 'application/json',

            },
            json: true,
        };

        let optionsUrl = {
            method: 'GET',
            baseUrl: apiUrl,
            url: region+'/Accounts/' + accountId + '/Videos',
            qs: {
                'accessToken': accountAccessToken,
                'name':'video_name',
                'description':'description_name',
                'privacy':'private',
                'some_partition':'some_partition',
                'videoUrl':urlVideo
            },
            headers: {
                'Ocp-Apim-Subscription-Key': VIDEO_INDEXER_API_KEY,
                'Ocp-Apim-Subscription-Region': region,
                'Content-type': 'application/json',

            },
            json: true,
        };

        request(optionsNullUrl, function (err, res, body) {
            setAccountAccessToken(JSON.stringify(body, null, 4));
        });
    };


    return (
        <div class="container w-10/12 mx-auto">
            <div>
                <div class="md:grid md:grid-cols-3 md:gap-6">
                    <div class="md:col-span-1">
                        <div class="px-4 sm:px-0">
                            <h3 class="text-lg font-medium leading-6 text-gray-900">Choose video</h3>
                            <p class="mt-1 text-sm text-gray-600">
                                Insert a video URL or choose video from your local device
                            </p>
                        </div>
                    </div>
                    <div class="mt-5 md:mt-0 md:col-span-2">
                        <form action="#" method="POST">
                            <div class="shadow sm:rounded-md sm:overflow-hidden">
                                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div class="grid grid-cols-3 gap-6">
                                        <div class="col-span-3 sm:col-span-2">
                                            <label for="company_website"
                                                   class="block text-sm font-medium text-gray-700">
                                                Url Video
                                            </label>
                                            <div class="mt-1 flex rounded-md shadow-sm">
                  <span
                      class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    http://
                  </span>
                                                <input type="text" name="company_website" id="company_website"
                                                       class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                       onChange={event => setUrlVideo(event.target.value)}
                                                       placeholder="www.example.com"/>
                                            </div>
                                        </div>
                                    </div>


                                    <div>

                                        <div class="mt-2 flex items-center">
                                            <p className="mt-2 text-sm text-gray-500">
                                                Select and upload your local video
                                            </p>
                                            <button
                                                className="bg-blue-300 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ml-5"
                                                type="button" style={{transition: "all .15s ease"}} onClick={getAccessToken}>

                                                <div>
                                                    <input
                                                        style={{ display: "none" }}
                                                        //accept=".zip,.rar"
                                                        ref={inputFile}
                                                        onChange={handleFileUpload}
                                                        type="file"
                                                    />
                                                    <input type="file" ref={inputFile} onChange={event => setPathVideo(event.target.value)}/>

                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="hidden sm:block" aria-hidden="true">
                <div class="py-5">
                    <div class="border-t border-gray-200"></div>
                </div>
            </div>

            <div class="mt-10 sm:mt-0 bg-blue-100">
                <div class="md:grid md:grid-cols-3 md:gap-6">
                    <div class="md:col-span-1">
                        <div class="px-4 sm:px-0">
                            <h3 class="text-lg font-medium leading-6 text-gray-900">Step to indexing video</h3>
                            <ol>
                                <li>Step 1 - Copy the video URL or choose local video</li>
                                <li>Step 2 - Choose subtitles language</li>
                                <li>Step 3 - Start the indexing process and waiting for video</li>
                                <li>Step 4 - View the indexed video with subtitles</li>
                            </ol>
                        </div>
                    </div>

                </div>
            </div>

            <div class="hidden sm:block" aria-hidden="true">
                <div class="py-5">
                    <div class="border-t border-gray-200"></div>
                </div>
            </div>
            <div className="text-center flex justify-center items-center mb-3 pr-4 sm:pr-0">
<span className="text-md bg-gray-500 text-white px-8 sm:px-6 py-2 shadow text-center mb-4 mr-4 sm:mb-0 rounded-full">
Step 1
</span>
                <h3 id="step-1" className="header_center mb-0 leading-normal ">
                    Copy the video URL or choose local video</h3>
            </div>
            <article className="container text-sm text-grey-dark leading-normal max-w-xl px-4 mx-auto text-center mb-6">
                <p className="mb-3">
                    While searching on the video Webcasterfeed.com you got some video by which you actually wanted to
                    have mp4 of.
                    just copy the url of that page which contain the media by either copying from url bar.
                    I know its pretty easy you can move to next step, just some keyboard shortcuts.
                    Press <b className="mx-1">(CTRL/Command + L)</b> for selecting url bar &amp; Press <b
                    className="mx-1">(CTRL/Command + C)</b>
                    for copying the url.
                </p>
            </article>
            <div className="text-center flex justify-center items-center mb-3 pr-4 sm:pr-0">
<span className="text-md bg-gray-500  text-white px-8 sm:px-6 py-2 shadow text-center mb-4 mr-4 sm:mb-0 rounded-full">
Step 2
</span>
                <h3 id="step-2" className="header_center mb-0 leading-normal ">
                    Choose subtitles languages</h3>
            </div>
            <article className="container text-sm text-grey-dark leading-normal max-w-xl px-4 mx-auto text-center mb-6">
                <p className="mb-3">
                    While searching on the video Webcasterfeed.com you got some video by which you actually wanted to
                    have mp4 of.
                    just copy the url of that page which contain the media by either copying from url bar.
                    I know its pretty easy you can move to next step, just some keyboard shortcuts.
                    Press <b className="mx-1">(CTRL/Command + L)</b> for selecting url bar &amp; Press <b
                    className="mx-1">(CTRL/Command + C)</b>
                    for copying the url.
                </p>
            </article>
            <div className="text-center flex justify-center items-center mb-3 pr-4 sm:pr-0">
<span className="text-md bg-gray-500  text-white px-8 sm:px-6 py-2 shadow text-center mb-4 mr-4 sm:mb-0 rounded-full">
Step 3
</span>
                <h3 id="step-3" className="header_center mb-0 leading-normal ">
                    Start the indexing process and waiting for</h3>
            </div>
            <article className="container text-sm text-grey-dark leading-normal max-w-xl px-4 mx-auto text-center mb-6">
                <p className="mb-3">
                    While searching on the video Webcasterfeed.com you got some video by which you actually wanted to
                    have mp4 of.
                    just copy the url of that page which contain the media by either copying from url bar.
                    I know its pretty easy you can move to next step, just some keyboard shortcuts.
                    Press <b className="mx-1">(CTRL/Command + L)</b> for selecting url bar &amp; Press <b
                    className="mx-1">(CTRL/Command + C)</b>
                    for copying the url.
                </p>
            </article>
            <div className="text-center flex justify-center items-center mb-3 pr-4 sm:pr-0">
<span className="text-md bg-gray-500  text-white px-8 sm:px-6 py-2 shadow text-center mb-4 mr-4 sm:mb-0 rounded-full">
Step 4
</span>
                <h3 id="step-4" className="header_center mb-0 leading-normal ">
                    View the indexed video with subtitles </h3>
            </div>
            <article className="container text-sm text-grey-dark leading-normal max-w-xl px-4 mx-auto text-center mb-6">
                <p className="mb-3">
                    While searching on the video Webcasterfeed.com you got some video by which you actually wanted to
                    have mp4 of.
                    just copy the url of that page which contain the media by either copying from url bar.
                    I know its pretty easy you can move to next step, just some keyboard shortcuts.
                    Press <b className="mx-1">(CTRL/Command + L)</b> for selecting url bar &amp; Press <b
                    className="mx-1">(CTRL/Command + C)</b>
                    for copying the url.
                </p>
            </article>
        </div>
    );

}