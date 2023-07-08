/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Image from "next/image";
import axios, { Method } from "axios";

interface Collection {
  name: string;
  id: string;
  smart_money_inflow_24h: number;
  smart_money_inflow_7d: number;
  slug: string;
  supply: number;
  current_owner_count: number;
  owners_avg_usdc_holdings: number;
  avg_price_sol: number | null;
  avg_price_usd: number | null;
  sol_price_usd: number;
  sol_price_usd_last_updated: number;
  magic_eden_holding: number;
  magic_eden_holding_proportion: number;
  market_cap_usd: number | null;
  market_cap_sol: number | null;
  average_wash_score: number;
  sample_image: string;
  mint_price_mode: number | null;
  narrative: string;
  external_url: string;
  listing_count: number | null;
  granularity: string;
  nrt_price: number;
  nrt_prev_price: number;
  nrt_volume: number;
  nrt_prev_volume: number;
  nrt_price_percent_change: number | null;
  nrt_volume_percent_change: number | null;
  nrt_price_delta: number;
  nrt_volume_delta: number;
}

export default function Popular() {
    const [popularCollections, setPopularCollections] = useState<Collection[]>([]);
  
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
          orderby: { smartMoneyInflow: "desc", topSocialBuying: "desc" },
          viewRange: "1d",
          pagination: { limit: 20, offset: 0 },
        },
      };
  
      axios
        .request(options)
        .then(function (response) {
          setPopularCollections(response.data.nfts.map((collection: Collection) => ({
            ...collection,
            nrt_price: collection.nrt_price / 1_000_000_000,
          })));
          console.log(response.data.nfts);
        })
        .catch(function (error) {
          console.error(error);
        });
    }, []);
  
    return (
      <div>
        <h1 className="text-[#f8f8f8]">Popular Collections</h1>
        <ul className="space-y-4">
          {popularCollections.map((collection) => (
            <li key={collection.id} className="border border-gray-300 rounded p-4">
              <div className="flex space-x-4 items-center">
                <div className="flex flex-row">
                <div className="w-12 h-12 rounded-full">
                  <img
                    src={collection.sample_image}
                    alt={collection.name}
                    width={100}
                    height={100}
                  />
                </div>
                <h2 className="text-medium font-bold text-[#f8f8f8]">
                  {collection.name}
                </h2>
                <h3 className="text-sm font-bold text-[#f8f8f8]">{collection.nrt_price} SOL</h3>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }