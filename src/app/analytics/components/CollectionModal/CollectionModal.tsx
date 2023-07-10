/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import axios, { Method } from "axios";
import { CollectionStats } from "../../interfaces/interfaces";
import Image from "next/image";
import CollectionChart from "./components/CollectionChart";

interface CollectionModalProps {
  collectionId: string;
  onClose: () => void;
}

const CollectionModal: React.FC<CollectionModalProps> = ({
  collectionId,
  onClose,
}) => {
  const [collectionStats, setCollectionStats] =
    useState<CollectionStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "POST" as Method,
          url: "https://rest-api.hellomoon.io/v0/nft/collection/stats",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            authorization: "Bearer e61f6dc6-b585-42fa-90aa-4611b292cf47",
          },
          data: {
            granularity: "ONE_DAY",
            helloMoonCollectionId: collectionId,
          },
        };

        const response = await axios.request(options);
        setCollectionStats(response.data.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [collectionId]);

  const handleModalContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const formatLamportsToSol = (lamports: number): number => {
    const conversionFactor = 1e9;
    return lamports / conversionFactor;
  };

  const formatExternalUrl = (url: string | undefined): string => {
    if (url) {
      const trimmedUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
      return trimmedUrl;
    }
    return "";
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[#000000] bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-[#111111] rounded-lg shadow-xl w-[85vw] h-[80vh] p-6"
        onClick={handleModalContentClick}
      >
        {collectionStats ? (
          <>
            <button
              className="absolute top-0 right-0 m-2 p-2 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 11.414l4.95 4.95a1 1 0 001.414-1.414L11.414 10l4.95-4.95a1 1 0 10-1.414-1.414L10 8.586 5.05 3.636a1 1 0 00-1.414 1.414L8.586 10l-4.95 4.95a1 1 0 001.414 1.414L10 11.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="flex flex-row">
              <div className="w-12 h-12">
                <img
                  className="rounded-full"
                  src={collectionStats.sample_image}
                  alt={collectionStats.collectionName}
                  width={100}
                  height={100}
                />
              </div>
              <h1 className="text-[#f8f8f8] ml-4 mt-auto text-2xl font-bold">
                {collectionStats.collectionName}
              </h1>
              <h2 className="text-sm text-gray-400 mt-auto ml-6">Floor</h2>
              <h1 className="flex flex-row text-green-400 ml-2 mt-auto text-xl font-bold">
                {formatLamportsToSol(
                  collectionStats.floorPriceLamports
                ).toFixed(2)}
                <Image
                  className="ml-2"
                  src="/solana.svg"
                  alt=""
                  height={20}
                  width={20}
                />
              </h1>
              <h2 className="text-sm text-gray-400 mt-auto ml-6">Volume</h2>
              <h1 className="flex flex-row text-[#f8f8f8] ml-2 mt-auto text-xl font-bold">
                {formatLamportsToSol(collectionStats.volume).toFixed(2)}
                <Image
                  className="ml-2"
                  src="/solana.svg"
                  alt=""
                  height={20}
                  width={20}
                />
              </h1>
              <h2 className="text-sm text-gray-400 mt-auto ml-6">Buyers</h2>
              <h1 className="flex flex-row text-[#f8f8f8] ml-2 mt-auto text-xl font-bold">
                {collectionStats.cnt_buyers_1d}
              </h1>
              <h2 className="text-sm text-gray-400 mt-auto ml-6">Sellers</h2>
              <h1 className="flex flex-row text-[#f8f8f8] ml-2 mt-auto text-xl font-bold">
                {collectionStats.cnt_sellers_1d}
              </h1>

              {collectionStats.external_url && (
                <><h2 className="text-sm text-gray-400 mt-auto ml-6">SM Inflow</h2><h1 className="flex flex-row text-[#f8f8f8] ml-2 mt-auto text-xl font-bold">
                  {collectionStats.smart_inflow_12_hour}
                  <Image
                    className="ml-2"
                    src="/solana.svg"
                    alt=""
                    height={20}
                    width={20} />
                </h1></>
              )}
              {collectionStats.external_url && (
                <a
                  className="mt-auto ml-8 text-[#f9f9f9] font-bold text-lg"
                  href={collectionStats.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="flex flex-row">
                    {formatExternalUrl(collectionStats.external_url)}
                    <Image
                      className="ml-2"
                      src="/external-link.svg"
                      alt=""
                      height={20}
                      width={20}
                    />
                  </button>
                </a>
              )}
            </div>
            <div className="pl-auto mt-auto chart-container">
              <CollectionChart collectionId={collectionId} />
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CollectionModal;
