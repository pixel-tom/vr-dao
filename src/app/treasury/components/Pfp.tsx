import Image from "next/image";
import { useState } from "react";

function truncateAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export default function Pfp() {
  const [copySuccess, setCopySuccess] = useState<string>("");
  const address = "2ByZ3uapan7WkhnqJ5jTnCChqUsK9kXbbjSn633iXWnH";

  const copyToClipboard = async (text: string) => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text).then(
        () => {
          setCopySuccess("Copied!");
          setTimeout(() => setCopySuccess(""), 2000);
        },
        (err) => {
          setCopySuccess("Failed to copy text.");
        }
      );
    } else {
      setCopySuccess(
        "Failed to copy text. Your browser may not support this feature."
      );
    }
  };

  return (
    <div className="flex flex-row">
      <div>
        <Image
          className="rounded-full"
          src="/profile-picture.webp"
          alt={""}
          width={85}
          height={85}
        ></Image>
      </div>
      <div className="flex flex-col">
        <h1 className="w-full mt-auto ml-5 text-[#f8f8f8] text-3xl">
          VRDAO.sol
        </h1>
        <div className="flex flex-row">
          
          <button
            onClick={() => copyToClipboard(address)}
            className="text-gray-400 ml-5 mt-1 text-sm flex items-center hover:text-gray-200"
          >
            {truncateAddress(address)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 my-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 2a3 3 0 00-3 3v12a2 2 0 002 2h10a2 2 0 002-2V7.414A2 2 0 0016.414 6L13 2.586A2 2 0 0011.586 2H8zm5 2.414l3 3V17H7V5a1 1 0 011-1h5z" />
            </svg>
          </button>
          <div className="text-green-500 text-xs ml-3 mb-[2px] mt-auto">
            {copySuccess}
          </div>
        </div>
      </div>
    </div>
  );
}
