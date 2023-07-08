import { useState, useEffect } from "react";
import Image from 'next/image';
import axios, { Method } from 'axios';

interface NFT {
  nftMint: string;
  ownerAccount: string;
  metadataAddress: string;
  metadataJson: {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: {
      address: string;
      verified: boolean;
      share: number;
    }[];
  };
  nftCollectionMint: string | null;
  verifiedCreators: string[] | null;
  helloMoonCollectionId: string | null;
}

export default function NftPortfolio() {
  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    const options = {
      method: 'POST' as Method,
      url: 'https://rest-api.hellomoon.io/v0/nft/mints-by-owner',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer e61f6dc6-b585-42fa-90aa-4611b292cf47'
      },
      data: {ownerAccount: '2ByZ3uapan7WkhnqJ5jTnCChqUsK9kXbbjSn633iXWnH'}
    };

    axios
      .request(options)
      .then(function (response) {
        setNfts(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const createImageUrl = (nftMint: string) => {
    return `https://cdn.hellomoon.io/nft/${nftMint}?apiKey=e61f6dc6-b585-42fa-90aa-4611b292cf47&format=webp&width=500&height=500`;
  };

  return (
    <div className="mx-auto">
      <div className="h-[60vh] overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {nfts.map((nft, index) => (
          <div key={index} className="p-0">
            <Image className="rounded-lg" src={createImageUrl(nft.nftMint)} alt={nft.metadataJson.name} width={160} height={160}/>
            
          </div>
        ))}
      </div>
    </div>
  );
}
