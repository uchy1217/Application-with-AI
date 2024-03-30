"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaBeer, FaPaperPlane, FaTruckLoading } from "react-icons/fa";
import { db } from "../../../firebase";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useAppContext } from "@/context/AppContext";
import OpenAI from "openai";
import LoadingIcons from "react-loading-icons";
import FlipMove from "react-flip-move";

type Message = {
  text: string;
  sender: string;
  createdAt: Timestamp;
};

const Chat = () => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });

  const { selectedRoom, selectRoomName } = useAppContext();
  const [inputMessage, setInputMessage] =
    useState<string>("あなたはプロの会計士です");
  const [professional, setProfessional] = useState<string>("会計士");

  const handleProfessionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedProfessional = event.target.value;
    setProfessional(selectedProfessional);

    // 選択された職業に基づいてinputMessageを更新
    setInputMessage(`あなたはプロの${selectedProfessional}です`);
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const scrollDiv = useRef<HTMLDivElement>(null);

  //各Roomにおけるメッセージを取得
  useEffect(() => {
    if (selectedRoom) {
      const fetchMessages = async () => {
        const roomDocRef = doc(db, "rooms", selectedRoom);
        const messagesCollectionRef = collection(roomDocRef, "messages");

        const q = query(messagesCollectionRef, orderBy("createdAt"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const newMessages = snapshot.docs.map((doc) => doc.data() as Message);
          setMessages(newMessages);
        });

        return () => {
          unsubscribe();
        };
      };

      fetchMessages();
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (scrollDiv.current) {
      const element = scrollDiv.current;
      element.scrollTo({
        top: element.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const messageData = {
      text: inputMessage,
      sender: "user",
      createdAt: serverTimestamp(),
    };

    //メッセージをFirestoreに保存
    const roomDocRef = doc(db, "rooms", selectedRoom!);
    const messageCollectionRef = collection(roomDocRef, "messages");
    await addDoc(messageCollectionRef, messageData);

    setIsLoading(true);

    //OpenAIからの返信
    const gpt3Response = await openai.chat.completions.create({
      messages: [{ role: "user", content: inputMessage }],
      model: "gpt-3.5-turbo",
    });

    setIsLoading(false);

    const botResponse = gpt3Response.choices[0].message.content;
    await addDoc(messageCollectionRef, {
      text: botResponse,
      sender: "bot",
      createdAt: serverTimestamp(),
    });

    setInputMessage("");
  };

  return (
    <div className="bg-blue-200 bg-opacity-10 h-screen pt-20 flex flex-col p-4">
      <h1 className="text-2xl text-gray-600 font-semibold mb-4">
        {selectRoomName}
      </h1>
      <div className="flex-grow overflow-y-auto mb-4" ref={scrollDiv}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.sender === "user" ? "text-right" : "text-left"}
          >
            <div
              className={
                message.sender === "user"
                  ? "bg-indigo-500 bg-opacity-70 inline-block rounded px-4 py-2 mb-2"
                  : "bg-fuchsia-800 bg-opacity-60 inline-block rounded px-4 py-2 mb-2"
              }
            >
              <p className="text-white">{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && <LoadingIcons.SpinningCircles />}
      </div>

      <div className="mb-4">
        <label htmlFor="profession-select" className="text-xl text-gray-700">
          職業を選択：
        </label>
        <select
          id="profession-select"
          value={professional}
          onChange={handleProfessionChange}
          className="text-xl px-4 py-1.5 bg-fuchsia-800 text-white rounded"
        >
          <option value="会計士">会計士</option>
          <option value="起業家">起業家</option>
          <option value="弁護士">弁護士</option>
        </select>
      </div>

      <div className="flex-shrink-0 relative">
        <input
          type="text"
          placeholder="Send a Message"
          className="text-lg border-2 rounded w-full pr-10 focus:outline-none p-3"
          onChange={(e) => setInputMessage(e.target.value)}
          value={inputMessage}
          /*
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          */
        />
        <button
          className="absolute inset-y-0 right-4 flex items-center"
          onClick={() => sendMessage()}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chat;
