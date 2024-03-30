import React from "react";
import Image from "next/image";
import { BiLogOut } from "react-icons/bi";
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
import { auth, db } from "../../../firebase";
import { useAppContext } from "@/context/AppContext";

//import ArticleCard from "./ArticleCard";
//import { Article } from "../types";

/*
type ArticleListProps = {
  articles: Article[];
};
*/

const ArticleList = () => {
  const { user, userId } = useAppContext();

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div className="p-4 md:w-1/3">
            <div className="bg-white h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  GPTs
                </h2>
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  Strategy Consultant for Tech Startup
                </h1>

                <div className="my-4">
                  <Image
                    src="/image/G001.png"
                    alt="G001 Image"
                    width={300}
                    height={300}
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <p className="leading-relaxed mb-3">
                  対象事業のSWOT, PEST, 5 Forces分析をします
                </p>
                <div className="flex items-center flex-wrap ">
                  <a
                    href="https://chat.openai.com/g/g-fdGbwO5Y8-strategy-consultant-for-tech-startups"
                    className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                  >
                    https://chat.openai.com/g/g-fdGbwO5Y8-strategy-consultant-for-tech-startups
                  </a>
                  <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg
                      className="w-4 h-4 mr-1"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </span>
                  <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg
                      className="w-4 h-4 mr-1"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 md:w-1/3">
            <div className="bg-white h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  GPTs
                </h2>
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  Global Startup Research
                </h1>

                <div className="my-4">
                  <Image
                    src="/image/G002.png"
                    alt="G001 Image"
                    width={300}
                    height={300}
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <p className="leading-relaxed mb-3">
                  キーワードを入れるとグローバルのスタートアップをリストアップします。
                </p>
                <div className="flex items-center flex-wrap">
                  <a
                    href="https://chat.openai.com/g/g-jXMKeb8cP-global-startup-researcher"
                    className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                  >
                    https://chat.openai.com/g/g-jXMKeb8cP-global-startup-researcher
                  </a>
                  <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg
                      className="w-4 h-4 mr-1"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </span>
                  <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg
                      className="w-4 h-4 mr-1"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 md:w-1/3">
            <div className="bg-white h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  GPTs
                </h2>
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  Business Model Canvas
                </h1>

                <div className="my-4">
                  <Image
                    src="/image/G003.png"
                    alt="G001 Image"
                    width={300}
                    height={300}
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <p className="leading-relaxed mb-3">
                  Business Model
                  Canvasを用いて、ビジネスアイディアを深掘りしてくれます
                </p>
                <div className="flex items-center flex-wrap ">
                  <a
                    href="https://chat.openai.com/g/g-2Z3mUDgKM-business-planning-for-tech-startups"
                    className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                  >
                    https://chat.openai.com/g/g-2Z3mUDgKM-business-planning-for-tech-startups
                  </a>
                  <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg
                      className="w-4 h-4 mr-1"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </span>
                  <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg
                      className="w-4 h-4 mr-1"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleList;
