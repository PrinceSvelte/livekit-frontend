"use client"
import React,{useState,useEffect,useRef} from 'react'
import { Room,
    createLocalVideoTrack,
 } from 'livekit-client';
 import { VideoRenderer } from '@livekit/react-core';

import CallIcon from "../public/call-icon.svg" 
import ScreenShareIcon from "../public/screen-share.svg" 
import CameraIcon from "../public/camera-icon.svg"
import MuteIcon from "../public/mute-icon.svg"  
import Image from "next/image";

const WS_URL = "wss://video-app-18or3v8b.livekit.cloud"
import axios from "axios";
const name ="prince"


const LivekitComponent2 = () => {
    const [token, setToken] = useState("");
    const [tracks,setTracks] = useState()
    const ref = useRef()
    // useEffect(() => {
    //     const el = ref.current;
    //     if (!el) {
    //       return;
    //     }
    //     el.muted = true;
    //     track.attach(el);
    //     return () => {
    //       track.detach(el);
    //     };
    //   }, [track, ref]);
    useEffect(() => {
        // const name = localStorage.getItem("name")
        (async () => {
          const resp = await axios.get(
            `http://localhost:3005/getToken?name=${name}`
          );
          if (resp.status === 200) {
            // console.log(resp, "resp");
            const tracks = await createLocalTracks({
                audio: true,
                video: true,
              });
              setTracks(tracks)
            setToken(resp?.data);
          }
          // setToken(tokenKey);
          //   const data = await resp.json();
        })();
      }, []);
      const room = new Room();
    //   console.log('connected to room', room.name);
      const handleRoom = async() => {
        await room.connect(WS_URL, token).then((res) => {
            console.log(res,"res")
        });
    //   console.log(value,"value")
      }
      if(token){
        console.log(token,"token")
      handleRoom()
      }
      const handleCamera = async() => {
        await room.localParticipant.enableCameraAndMicrophone();
      }

  return (
    <div>
                       <div className="flex p-4 justify-center items-center my-[40px]">
               <div className="mx-2"
    //             onClick={() =>     setIconState({
    //     ...iconState,
    //     isMicrophoneEnabled:!iconState.isMicrophoneEnabled
    // })} 
    >
        {/* <video ref={ref} /> */}
        {tracks?.map((t) => {
        <VideoRenderer track={t} isLocal={false} />
      })}
                   <Image className="cursor-pointer" src={MuteIcon} width={50} height={50} />
                   </div>
               <div className="mx-2" 
            //    onClick={() =>  handleRoom()}
                >
                   <Image className="cursor-pointer" onClick={handleCamera}  src={CameraIcon} width={50} height={50} />
                   </div>
                 <div className="mx-2"
                //   onClick={() => rooms?.disconnect()}
                  ><Image className="cursor-pointer"  src={CallIcon} width={50} height={50} /></div>
                 <div className="mx-2" 
                //  onClick={() => handleScreen() }
                 ><Image className="cursor-pointer"  src={ScreenShareIcon} width={50} height={50} /></div>
               </div>
    </div>
  )
}

export default LivekitComponent2