"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Chat from "../components/Chat";
import Consulting from "../components/Consulting";
import { useAppContext } from "@/context/AppContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Page } from "openai/pagination.mjs";

export default function Chats() {
  const { user } = useAppContext();

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="flex flex-1 w-full" style={{ width: "1280px" }}>
        <div className="w-1/5 h-full border-r">
          <Sidebar />
        </div>
        <div className="w-4/5 flex flex-col">
          <Consulting />
        </div>
      </div>
    </div>
  );
}
