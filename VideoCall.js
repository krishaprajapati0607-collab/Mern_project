import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // signaling server

export default function VideoCall() {
  const [peerId, setPeerId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const peerRef = useRef(null);

  useEffect(() => {
    // Create a PeerJS connection
    const peer = new Peer();
    peerRef.current = peer;

    peer.on("open", (id) => {
      setPeerId(id);
      socket.emit("register", id);
    });

    // Handle incoming call
    peer.on("call", (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        call.answer(stream);
        localVideo.current.srcObject = stream;

        call.on("stream", (remoteStream) => {
          remoteVideo.current.srcObject = remoteStream;
        });
      });
    });
  }, []);

  const callUser = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      localVideo.current.srcObject = stream;

      const call = peerRef.current.call(remoteId, stream);

      call.on("stream", (remoteStream) => {
        remoteVideo.current.srcObject = remoteStream;
      });
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>📞 Video Consultation</h2>
      <p>Your ID: <b>{peerId}</b></p>
      <input
        type="text"
        placeholder="Enter Doctor/User ID"
        value={remoteId}
        onChange={(e) => setRemoteId(e.target.value)}
      />
      <button onClick={callUser}>Call</button>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <video ref={localVideo} autoPlay playsInline muted style={{ width: "300px", marginRight: "10px" }} />
        <video ref={remoteVideo} autoPlay playsInline style={{ width: "300px" }} />
      </div>
    </div>
  );
}
