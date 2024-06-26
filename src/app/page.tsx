"use client";

import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import SimpleSidebar from "./components/SimpleSidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="flex flex-1 w-full" style={{ width: "1280px" }}>
        <SimpleSidebar />

        <section>
          <ArticleList />
        </section>
      </div>
    </div>
  );
}

