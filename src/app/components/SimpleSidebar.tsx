"use client";

import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { auth, db } from "../../../firebase";
import { useAppContext } from "@/context/AppContext";

type Room = {
  id: string;
  name: string;
  createdAt: Timestamp;
};

const SimpleSidebar = () => {
  const { user, userId } = useAppContext();

  const [rooms, setRooms] = useState<Room[]>([]);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="bg-fuchsia-800 w-60 bg-opacity-80 h-full overflow-y-auto px-4 pt-20 flex flex-col">
      <div className="flex-grow"></div>

      {user && (
        <div className="mb-2 p-4 text-slate-100 text-lg font-medium">
          {user.email}
        </div>
      )}

      <div
        onClick={handleLogout}
        className="text-lg flex items-center justify-evenly mb-2 cursor-pointer p-4 text-slate-100 hover:bg-fuchsia-900 duration-150"
      >
        <BiLogOut />
        <span>ログアウト</span>
      </div>
    </div>
  );
};

export default SimpleSidebar;
