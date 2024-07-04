import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../Components/Header";
import PositionTable from "../Components/PositionTable";
import sendIcon from '../assets/sendIcon.svg';
import ava from '../assets/ava.svg';

export default function Profile() {


    return (
        <div>
            <Header />
            <div className="mt-[120px] w-[1150px] mx-[auto] flex flex-col items-center space-y-[45px]">
                <div className={`flex justify-between w-full items-center`}>
                    <div className={`flex gap-[20px] items-center`}>
                        <img src={ava} alt="" className={"rounded-full w-[100px] h-[100px]"}/>
                        <div className={"flex flex-col h-full justify-center"}>
                            <p className={"text-xl font-medium"}>
                                Alexa Rawles
                            </p>
                            <p className={"text-base text-[#6D6A6A]"}>
                                alexarawles@gmail.com
                            </p>
                        </div>
                    </div>
                    <button className={"px-[30px] py-[10px] text-white rounded-[10px] bg-[#4182F9]"}>
                        Edit
                    </button>
                </div>
                <div className={"w-full flex justify-between gap-[30px]"}>
                    <div className={"flex flex-col gap-[10px] w-full"}>
                        <p className={"text-base"}>First Name</p>
                        <input type="text" className={"rounded-[10px] text-base p-2 w-full"}/>
                    </div>
                    <div className={"flex flex-col gap-[10px] w-full"}>
                        <p className={"text-base"}>Last Name</p>
                        <input type="text" className={"rounded-[10px] text-base p-2 w-full"}/>
                    </div>
                </div>
                <div className="flex w-full justify-between items-center p-5">
                    <div>
                        <p>My email Address</p>
                        <div className="text-center w-52 flex gap-[10px]">
                            <img
                                className="rounded-full w-12 h-12 mx-auto"
                                src="https://via.placeholder.com/50"
                                alt="email icon"
                            />
                            <div>
                                <p>alexarwales@gmail.com</p>
                                <p>1 month ago</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-start w-52">
                        <p>HeadHunter</p>
                        <button className="mt-2 px-4 py-2 bg-red-400 text-white rounded">
                            Connect HeadHunter
                        </button>
                    </div>
                    <div className="text-start w-52">
                        <p>Linkedin</p>
                        <button className="mt-2 px-4 py-2 bg-blue-300 text-white rounded">
                            Connect Linkedin
                        </button>
                    </div>
                </div>
                <div className={`w-full`}>
                    <p>Резюмы</p>

                </div>
            </div>

        </div>

    );
}

const ResumeComponent = ({name, size}) => {
    return (
        <div className={`flex p-2`}>
            <img src="/src/assets/fileIcon.svg" alt=""/>
            <p>{name}</p>
            <div className={"w-1 h-1 rounded-full bg-[#767676]"}></div>
            <a href="#">Preview</a>
            <p>{size}</p>
        </div>
    )
}
