import { useState, useEffect } from "react";
import axios, { Method } from "axios";
import { Token, TokenMetadata } from "../interfaces/interfaces";


export default function SplPortfolio() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetadata[]>([]);

  const address = "2ByZ3uapan7WkhnqJ5jTnCChqUsK9kXbbjSn633iXWnH";

  useEffect(() => {
    const options = {
      method: "POST" as Method,
      url: "https://rest-api.hellomoon.io/v0/token/balances-by-owner",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "Bearer e61f6dc6-b585-42fa-90aa-4611b292cf47",
      },
      data: { ownerAccount: address },
    };

    axios
      .request(options)
      .then(function (response) {
        setTokens(response.data);

        if (response.data.length > 0) {
          const mintList = response.data.map((token: Token) => token.mint);
          fetchMetadata(mintList);
        }
      })
      .catch(function (error) {
        console.error(error);
      });

    const fetchMetadata = async (mintList: string[]) => {
      const options = {
        method: "POST" as Method,
        url: "https://rest-api.hellomoon.io/v0/token/list",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: "Bearer e61f6dc6-b585-42fa-90aa-4611b292cf47",
        },
        data: { mint: mintList },
      };

      try {
        const response = await axios.request(options);
        setTokenMetadata(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
  }, []);


  return (
    <div className="w-full mx-auto pr-10">
      <div className="text-[#f8f8f8] text-center w-full">
        <div className="grid grid-cols-2 gap-4">
          {tokenMetadata.map((metadata, index) => {
            const token = tokens.find((t) => t.mint === metadata.mint);
            if (token && token.amount !== "0") {
              const formattedAmount =
                Number(token.amount) / Math.pow(10, metadata.decimals);
              return (
                <div
                  key={index}
                  className="bg-[#181818] p-4 rounded-lg shadow-md flex flex-col justify-center items-center"
                >
                  <p className="text-sm font-semibold mb-2">
                    {metadata.name}
                  </p>
                  <p className="text-xl font-bold">{formattedAmount.toFixed(2)}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
