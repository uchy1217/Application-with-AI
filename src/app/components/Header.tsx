import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div
      className="fixed top-0 py-0.5 px-10 items-center justify-center bg-stone-700 text-gray-200 text-xl body-font flex"
      style={{ margin: "0 auto", width: "1280px" }}
    >
      <Link href="/">
        <Image
          src="/image/L002.png"
          alt="G001 Image"
          width={200}
          height={50}
          style={{ objectFit: "cover" }}
        />
      </Link>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <Link href="/articles">
          <div className="mr-6 font-semibold text-xl hover:text-fuchsia-500">
            GPTs
          </div>
        </Link>

        <Link href="/chats">
          <div className="mr-6 font-semibold text-xl hover:text-fuchsia-500">
            Normal
          </div>
        </Link>

        <Link href="/consulting">
          <div className="mr-3 font-semibold text-xl hover:text-fuchsia-500">
            Consulting
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
