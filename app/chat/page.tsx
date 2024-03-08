"use client";
import { FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Background from '../assets/bg-img.webp'

export default function Home() {
  const [message, setMsg] = useState<any>(undefined);
  const [room, setRoom] = useState<any>("room");
  const [inbox, setInbox] = useState<any[]>([]);
  const socket = io("http://localhost:3030");

  useEffect(() => {
    socket.on("message", (msg: string) => {
      setInbox((prevChat) => [...prevChat, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const senMsg = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("message", message, room);
    setMsg("");
  };
  const joinRoom = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("joinRoom", room);
  };
  return (
    <>
    <div className="chat-img h-screen flex items-center">
      <main className="container mx-auto p-4  bg-transparent flex flex-col items-center justify-center text-gray-700" >
        <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
          <h1 className="text-4xl font-semibold">ChatSphere</h1>
        </div>
        <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-6">
          <input
          id="message"
            value={message}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
            type="text"
            placeholder="Message"
          />
          <input
            className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
            type="text"
            id="room"
            placeholder="Room"
            value={room}
            onChange={(e) => { setRoom(e.target.value) }}
          />
          <div className="flex items-center gap-4">
            <button
              className="ml-auto w-1/2 bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900"
              type="submit"
              onClick={joinRoom}
            >
              Join
            </button>
            <button
              className="ml-auto w-1/2 bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900"
              type="submit"
              onClick={senMsg}>
            
              Send
            </button>
          </div>
        </div>
      </main>
      <div>
        {inbox.map((msg: string) => (
          <div>{msg}</div>
        ))}
      </div>
    </div>
    </>
  );
}
