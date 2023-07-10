/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import axios, { Method } from "axios";
import Image from "next/image";
import { Collection } from "../interfaces/interfaces";
import CollectionModal from "./CollectionModal/CollectionModal";

export default function SmartMoney() {
  const [popularCollections, setPopularCollections] = useState<Collection[]>(
    []
  );
  const [expandedCollectionId, setExpandedCollectionId] = useState<
    string | null
  >(null);

  const handleExpandCollection = (collectionId: string) => {
    setExpandedCollectionId(collectionId);
  };

  const handleCloseCollectionModal = () => {
    setExpandedCollectionId(null);
  };

  useEffect(() => {
    const options = {
      method: "POST" as Method,
      url: "https://rest-api.hellomoon.io/v0/nft/leaderboard",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "Bearer e61f6dc6-b585-42fa-90aa-4611b292cf47",
      },
      data: {
        orderby: { smartMoneyInflow: "desc" },
        viewRange: "1d",
        pagination: { limit: 25, offset: 0 },
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setPopularCollections(
          response.data.nfts.map((collection: Collection) => ({
            ...collection,
            nrt_price_percent_change:
              collection.nrt_price_percent_change != null
                ? collection.nrt_price_percent_change.toFixed(2)
                : null,
            nrt_price: collection.nrt_price / 1_000_000_000,
            nrt_volume: collection.nrt_volume / 1_000_000_000,
            sol_price_usd:
              (collection.nrt_price / 1_000_000_000) * collection.sol_price_usd,
          }))
        );
        console.log(response.data.nfts);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <ul className=" h-[80vh] overflow-auto">
        <li className="border border-gray-600 rounded p-4 text-white font-semibold">
          <div className="flex space-x-4 items-center">
            <div className="flex flex-row">
              <div className="w-12 h-6"></div>
              <h2 className="ml-4 w-64 my-auto text-sm text-[#f8f8f8]">
                Collection Name
              </h2>
              <h3 className="ml-6 w-24 my-auto text-sm text-[#f8f8f8]">
                Price (SOL)
              </h3>
              <h3 className="ml-6 w-24 my-auto text-sm text-[#f8f8f8]">
                Price (USD)
              </h3>
              <h3 className="ml-6 w-24 my-auto text-sm text-[#f8f8f8]">
                Volume (SOL)
              </h3>
              <h3 className="ml-6 w-24 my-auto text-sm text-[#f8f8f8]">
                Price Change
              </h3>
              <h3 className="ml-6 w-24 my-auto text-sm text-[#f8f8f8]">
                Wash Score
              </h3>
              <h3 className="ml-6 w-24 my-auto text-sm text-[#f8f8f8]">
                Listing Count
              </h3>
              <h3 className="ml-6 w-24 my-auto text-sm text-[#f8f8f8]">
                Supply
              </h3>
            </div>
          </div>
        </li>
        {popularCollections.map((collection) => (
          <li
            key={collection.id}
            className="border-l border-gray-600  py-2 px-4"
          >
            <div className="flex space-x-4 items-center">
              <div className="flex flex-row">
                <div className="w-10 h-10">
                  <img
                    className="rounded-full"
                    src={collection.sample_image}
                    alt={collection.name}
                    width={100}
                    height={100}
                  />
                </div>

                <button
                  className="ml-6 text-left w-64 my-auto text-sm font-bold text-[#f8f8f8] hover:text-gray-300"
                  onClick={() => handleExpandCollection(collection.id)}
                >
                  {collection.name}
                </button>

                <h3 className="flex flex-row ml-6 w-24 my-auto text-sm font-bold text-green-400">
                  {collection.nrt_price.toFixed(2)}{" "}
                  <Image
                    className="ml-2"
                    src="/solana.svg"
                    alt=""
                    height={15}
                    width={15}
                  />
                </h3>
                <h3 className="ml-6 w-24 my-auto text-sm text-[#f8f8f8] font-bold">
                  ${collection.sol_price_usd.toFixed(2)}
                </h3>
                <h3 className="flex flex-row ml-6 w-24 my-auto text-sm font-bold text-[#f8f8f8]">
                  {collection.nrt_volume.toFixed(2)}{" "}
                  <Image
                    className="ml-2"
                    src="/solana.svg"
                    alt=""
                    height={15}
                    width={15}
                  />
                </h3>
                <h3
                  className={`ml-6 w-24 my-auto text-sm font-bold ${
                    collection.nrt_price_percent_change &&
                    collection.nrt_price_percent_change > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {collection.nrt_price_percent_change}%
                </h3>
                <h3 className="ml-6 w-24 my-auto text-sm text-[#f8f8f8] font-bold">
                  {collection.average_wash_score.toFixed(2)}%
                </h3>
                <h3 className="ml-6 w-24 my-auto text-sm text-[#f8f8f8] font-bold">
                  {collection.listing_count}
                </h3>
                <h3 className="ml-6 w-24 my-auto text-sm text-[#f8f8f8] font-bold">
                  {collection.supply}
                </h3>
              </div>
              <div></div>
            </div>
          </li>
        ))}
      </ul>
      {expandedCollectionId && (
        <CollectionModal collectionId={expandedCollectionId} onClose={handleCloseCollectionModal} />
      )}
    </div>
  );
}
