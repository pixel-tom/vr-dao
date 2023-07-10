"use client";
import React, { useEffect, useState } from "react";
import { CitrusSdk } from "@famousfoxfederation/citrus-sdk";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import Image from "next/image";
import { Loan, LtvTerms, Terms } from "../types/types"

declare enum Status {
  WaitingForBorrower = "waitingForBorrower",
  WaitingForLender = "waitingForLender",
  Repaid = "repaid",
  Defaulted = "defaulted",
  Active = "active",
  OnSale = "onSale",
}

type CollectionLoansProps = {
  collectionId: string;
};

export default function CollectionLoans({
  collectionId,
}: CollectionLoansProps) {
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    const loanPubkey = new PublicKey(collectionId);
    const fetchLoans = async () => {
      const wallet = {
        publicKey: Keypair.generate().publicKey,
        signTransaction: () => Promise.reject(),
        signAllTransactions: () => Promise.reject(),
      };
      const connection = new Connection(
        "https://rpc.helius.xyz/?api-key=e6b85a35-8829-4016-ac2f-90755018d1b6"
      );
      const sdk = new CitrusSdk(wallet, connection);
      const fetchedLoans: Loan[] = await sdk.fetchCollectionLoans(
        loanPubkey,
        Status.WaitingForBorrower
      );
      setLoans(fetchedLoans);
      console.log(fetchedLoans);
    };

    fetchLoans();
  }, [collectionId]);

  return (
    <main className="items-center justify-between">
      <div className="container mx-auto py-4">
        {loans
          .filter(
            (collection) =>
              collection.borrower !== undefined &&
              collection.borrower === "11111111111111111111111111111111"
          )
          .sort((a, b) => {
            const amountA =
              a.ltvTerms && a.ltvTerms.maxOffer !== null
                ? a.ltvTerms.maxOffer / 10 ** 9
                : a.terms.principal / 10 ** 9;
            const amountB =
              b.ltvTerms && b.ltvTerms.maxOffer !== null
                ? b.ltvTerms.maxOffer / 10 ** 9
                : b.terms.principal / 10 ** 9;
            return amountB - amountA; // Sort in descending order
          })
          .map((collection, index) => {
            const loanAmount =
              collection.ltvTerms && collection.ltvTerms.maxOffer !== null
                ? collection.ltvTerms.maxOffer / 10 ** 9
                : collection.terms.principal / 10 ** 9;
            const apy = collection.terms.apy / 10000;
            const durationInDays = collection.terms.duration / (24 * 60 * 60);
            const dailyFees = (loanAmount * apy) / 365;
            const fees = dailyFees * durationInDays;
  
            return (
              <div
                key={index}
                className="flex flex-row px-10 py-3 my-auto rounded shadow"
              >
                <Image
                  className="mr-8"
                  src="/citrus-logo.webp"
                  alt=""
                  height={15}
                  width={65}
                />
                <div className="flex flex-row w-48 ml-6 mt-auto">
                  <p className="mt-auto mb-1 text-xs text-gray-400">Amount</p>
                  <h1 className="flex flex-row font-bold text-green-400 text-lg mt-auto ml-2">
                    {loanAmount}
                    <Image
                      className="ml-2"
                      src="/solana.svg"
                      alt=""
                      height={15}
                      width={15}
                    />
                  </h1>
                </div>
                <div className="flex flex-row w-32 mt-auto">
                  <p className="mt-auto mb-1 text-xs text-gray-400">APY</p>
                  <h1 className="ml-2 mt-auto w-32 font-bold text-[#f8f8f8] text-lg">
                    {collection.terms.apy / 100} %
                  </h1>
                </div>
                <div className="flex flex-row w-32 mt-auto">
                  <p className="mt-auto mb-1 text-xs text-gray-400">Fees</p>
                  <h1 className="ml-2 mt-auto font-bold text-[#f8f8f8] text-lg">
                    {fees.toFixed(2)}
                  </h1>
                  <Image
                      className="ml-2"
                      src="/solana.svg"
                      alt=""
                      height={15}
                      width={15}
                    />
                </div>
                <div className="flex flex-row w-48 mt-auto">
                  <p className="mt-auto mb-1 text-xs text-gray-400">Duration</p>
                  <h1 className="font-bold text-[#f8f8f8] text-lg ml-2 mt-auto">
                    {collection.terms.duration / (24 * 60 * 60)} Days
                  </h1>
                </div>
                <a
                  className="mt-auto"
                  href={`https://xray.helius.xyz/account/${collection.lender}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex flex-row w-48 mt-auto">
                    <p className="mt-auto mb-1 text-xs text-gray-400">Lender</p>
                    <h1 className="text-[#f8f8f8] ml-2 mt-auto">
                      {`${collection.lender.substring(0, 4)}...${collection.lender.substring(collection.lender.length - 4)}`}
                    </h1>
                    <Image
                      className="ml-2"
                      src="/external-link.svg"
                      alt=""
                      height={20}
                      width={20}
                    />
                  </div>
                </a>
                <button className="ml-6 text-[#f8f8f8] rounded-md border border-gray-300 py-2 px-4">
                  Take Loan
                </button>
              </div>
            );
          })}
      </div>
    </main>
  );
  
  
  
}
