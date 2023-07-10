export interface Token {
    mint: string;
    owner: string;
    amount: string;
    delegateOption: number;
    delegate: string;
    state: number;
    isNativeOption: number;
    isNative: string;
    delegatedAmount: string;
    closeAuthorityOption: number;
    closeAuthority: string;
  }
  
export interface TokenMetadata {
    id: string;
    mint: string;
    name: string;
    symbol: string;
    decimals: number;
    slug: string;
    coingeckoId: string | null;
    lifetimeSwapCount: number;
  }

export interface NFT {
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