"use client";
import { FormEvent, useEffect, useState } from "react";
import Background1 from "../assets/bg-img.webp";
import { io } from "socket.io-client";
import axios from "axios";
const socket = io("http://localhost:9000");

export default function Join() {
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleJoin = () => {
    if (username !== "") {
      
      socket.emit("joinRoom", username);
     setShowChat(true);
    }
  };
// ===========================chat===================
const [message, setMessage] = useState<string>("");
const [room, setRoom] = useState<any>("room1");
const [inbox, setInbox] = useState([]);

const getMsg=async()=>{
  const res=await axios.get("http://localhost:9000/")
  const data=await res.data
 setInbox(data)
}
useEffect(()=>{
  socket.on("joinRoom",user => {
    setUser(user)})
    
    getMsg()    
    socket.on("message", () => {
      getMsg()
    });
},[inbox])
console.log('inbox: ', inbox);

const senMsg = (e: FormEvent) => {
  e.preventDefault();
  const messageData = {
    message,
    room
  }
  // console.log('message, room',messageData);
  
  socket.emit("message", messageData,user);
  setMessage("");
};

console.log(inbox)  
  return (
    <>
    {
      !showChat ? (
        <div
        className="flex flex-col items-center gap-y-7 justify-center h-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${Background1.src})`,
        }}
      >
        <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-orange-600 to-orange-400 bg-clip-border text-white shadow-lg shadow-orange-500/40">
            <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
              ChatSphere
            </h3>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                placeholder=""
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                username
              </label>
            </div>
          </div>
          <div className="p-6 pt-0">
            {/* <Link href="/chat"> */}
              <button
                onClick={handleJoin}
                data-ripple-light="true"
                type="button"
                className="block w-full select-none rounded-lg bg-gradient-to-tr from-orange-600 to-cyan-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Join Room
              </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
      ) : (
        <div className="chat-img h-screen flex justify-center items-center ">
        {/* component */}
        <div
          style={{
            boxShadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)",
            scrollbarWidth: "none"
          }}
          className="overflow-x-auto  bg-gray-400 p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]"
        >
          {/* Heading */}
          <div className="flex flex-col space-y-1.5 pb-6">
            <h2 className="font-semibold text-2xl tracking-tight underline text-orange-600  ">{username}</h2>
          </div>

          {/* Chat Container */}
          <div
            className="pr-4 h-[474px]"
            style={{ minWidth: "100%", display: "table" }}
          >

            {/* Chat Message AI */}
            {inbox.map((msg, index) => (
             
                <div className="h-16 flex gap-3 my-4 text-black font-semibold text-sm flex-1 justify-start" key={index}>
                  <div
                    className="w-full rounded-br rounded-tr rounded-bl p-3  bg-slate-200"
                    key={index}
                  >
                    {/* {msg.sender.username} */}
                    <div className="flex items-bottom justify-between text-red-700 font-semibold">
                      {msg.sender.username}
                    </div>
                    
                    <p className="text-grey-dark mt-1 text-sm pb-4">{msg.content}</p>
                  </div>
                </div>

                
             

            ))}


            {/* User Chat Message */}
            {/* <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                <div className="rounded-full bg-gray-100 border p-1">
                  <svg
                    stroke="none"
                    fill="black"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                  </svg>
                </div>
              </span>
              
            </div> */}

          </div>

          {/* Input box */}
          <div className="flex items-center pt-0">
            <form
              className="flex items-center justify-center w-full space-x-2"
              onSubmit={senMsg}
            >
              <input
                className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-tr from-orange-600 to-cyan-400 h-11 px-4 py-2"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>

      </div>
      )
    }
    </>
  );
}
