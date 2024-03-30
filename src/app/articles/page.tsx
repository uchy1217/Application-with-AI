"use client";

import React from "react";
import ArticleList from "../components/ArticleList";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SimpleSidebar from "../components/SimpleSidebar";

export default function Articles() {
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
