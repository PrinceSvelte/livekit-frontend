"use client";
// import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { LiveKitRoom } from "@livekit/react-components";
import "@livekit/react-components/dist/index.css";
import "react-aspect-ratio/aspect-ratio.css";

import CallIcon from "../public/call-icon.svg" 
import ScreenShareIcon from "../public/screen-share.svg" 
import CameraIcon from "../public/camera-icon.svg"
import MuteIcon from "../public/mute-icon.svg"  
import Image from "next/image";
import { useRoom } from "@livekit/react-components";

// import "@livekit/components-react/dist/index.css";
// import "@livekit/components-react/dist/components/";
// import "livekit-react/dist/index.css";

// export default LivekitComponent () => {
//   const room = "quickstart-room";
//   const name = "quickstart-user"; // TODO: interpolate with user name
//   const [token, setToken] = useState("");
//   const Ws_URL = "ws:video-app-18or3v8b.livekit.cloud";
//   useEffect(() => {
//     (async () => {
//       const resp = await axios.get(`http://localhost:3005/getToken`);
//       if (resp.status === 200) {
//         console.log(resp, "resp");
//         setToken(resp?.data);
//       }
//       // setToken(tokenKey);
//       //   const data = await resp.json();
//     })();
//   }, []);

//   if (token === "") {
//     return <div>Getting token...</div>;
//   }
//   console.log(token, "token");
//   return (
//     <LiveKitRoom
//       serverUrl={Ws_URL}
//       token={token}
//       connect={true}
//       video={true}
//       audio={true}
//     >
//       <VideoConference />
//     </LiveKitRoom>
//   );
// };

import React from "react";

const LiveKitComponent = () => {
  const [token, setToken] = useState("");
  const Ws_URL = "wss://video-app-18or3v8b.livekit.cloud";
  // const name = "prince";
  const [iconState,setIconState] = useState({
    isCameraEnabled:true,
    isMicrophoneEnabled:true
  })
  // console.log(isConnecting,"isConnect")
  const [rooms,setRooms] = useState()
  const name = localStorage.getItem("name")
  useEffect(() => {
    (async () => {
      const resp = await axios.get(
        `http://192.168.15.30:3000/getToken?name=${name}`
      );
      if (resp.status === 200) {
        console.log(resp, "resp");
        setToken(resp?.data);
      }
      // setToken(tokenKey);
      //   const data = await resp.json();
    })();
  }, []);


  const handleClick = () => {
    var elements = document.getElementsByClassName("_34YL4");
    console.log(elements[0].style, "ele");
    for (var i = 0; i < elements.length; i++) {
      // elements[i].className = ""
      elements[i].style.cssText = "10% !important";
    }
  };
  async function onConnected(room) {
    await room?.localParticipant.setCameraEnabled(iconState.isCameraEnabled);
    await room?.localParticipant.setMicrophoneEnabled(iconState.isMicrophoneEnabled);
  }

  const handleRoom = () => {
    setIconState({
        ...iconState,
        isCameraEnabled:!iconState.isCameraEnabled
    })
  }
  const handleScreen = async() => {
  await  rooms?.localParticipant.setScreenShareEnabled(true)
  }

{console.log(iconState.isCameraEnabled)}
  if (token === "") {
    return <div>Getting token...</div>;
  } else {
    return (
      <>
      <div className="flex justify-center items-center" style={{display: !iconState.isCameraEnabled ? "none" :"block"}}>
        <LiveKitRoom
          token={token}
          url={Ws_URL}
          onConnected={(room) => {
            setRooms(room)
            onConnected(room);
          }}
          onLeave={(room) => room.disconnect()}
        />
        </div>
             {!iconState.isCameraEnabled && <div className="flex justify-center">
     <div className="bg-[#808080] w-[50%] h-[50vh] flex justify-center items-center">
         <div className="flex justify-center items-center]"><h1 className="text-[100px]">P</h1></div>
        </div>
         </div>}
               <div className="flex p-4 justify-center items-center my-[40px]">
               <div className="mx-2" onClick={() =>     setIconState({
        ...iconState,
        isMicrophoneEnabled:!iconState.isMicrophoneEnabled
    })} >
                   <Image className="cursor-pointer" src={MuteIcon} width={50} height={50} />
                   </div>
               <div className="mx-2" onClick={() =>  handleRoom()} >
                   <Image className="cursor-pointer" src={CameraIcon} width={50} height={50} />
                   </div>
                 <div className="mx-2" onClick={() => rooms?.disconnect()}><Image className="cursor-pointer"  src={CallIcon} width={50} height={50} /></div>
                 <div className="mx-2" onClick={() => handleScreen() }><Image className="cursor-pointer"  src={ScreenShareIcon} width={50} height={50} /></div>
               </div>
      </>
   
        
    );
  }
};

export default LiveKitComponent;
