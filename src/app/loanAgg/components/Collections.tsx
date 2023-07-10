"use client";
import React, { useEffect, useState } from "react";
import { CitrusSdk } from "@famousfoxfederation/citrus-sdk";
import { Connection, Keypair } from "@solana/web3.js";
import Image from "next/image";
import CollectionLoans from "./CollectionLoans";

type Collection = {
  name: string;
  img: string;
  id: string;
  floor?: number;
  pool?: number;
  bestOffer?: number;
  bestApy?: number;
  duration?: number;
  loansAvailable?: number;
  loansTotal?: number;
  latestLoan?: number;
  volume: number;
};

export default function Collections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [expandedCollection, setExpandedCollection] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const wallet = {
        publicKey: Keypair.generate().publicKey,
        signTransaction: () => Promise.reject(),
        signAllTransactions: () => Promise.reject(),
      };
      const connection = new Connection(
        "https://rpc.helius.xyz/?api-key=e6b85a35-8829-4016-ac2f-90755018d1b6"
      );
      const sdk = new CitrusSdk(wallet, connection);
      const fetchedCollections: Collection[] = await sdk.fetchCollections();
      setCollections(fetchedCollections);
      console.log(fetchedCollections);
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen items-center justify-between bg-[url(/background.png)]">
      <div className="container w-[65vw] mx-auto py-4">
        {collections
          .filter(
            (collection) =>
              collection.loansAvailable !== undefined &&
              collection.loansAvailable > 0
          )
          .map((collection, index) => (
            <div key={index} className="my-4 bg-[#111111] rounded shadow mb-4">
              <div className="flex flex-row p-4 my-auto">
                <h3 className="w-72 text-medium my-auto text-[#f8f8f8] font-bold">
                  {collection.name}
                </h3>
                <p className="w-48 text-sm my-auto text-[#f8f8f8]">
                  Loans Available: {collection.loansAvailable}
                </p>
                <p className="w-48 text-sm my-auto text-[#f8f8f8]">
                  Total Loans: {collection.loansTotal}
                </p>
                <p className="w-48 flex items-center my-auto text-sm text-[#f8f8f8]">
                  Floor Price: {collection.floor}
                  <Image
                    className="ml-2"
                    src="/solana.svg"
                    alt=""
                    height={15}
                    width={15}
                  />
                </p>
                <div>
                  <button
                    className="text-[#f8f8f8]"
                    onClick={() => setExpandedCollection(collection.id)}
                  >
                    Fetch Loans
                  </button>
                </div>
              </div>
              {expandedCollection === collection.id && (
                <CollectionLoans collectionId={collection.id} />
              )}
            </div>
          ))}
      </div>
    </main>
  );
  
}
