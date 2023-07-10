export type Collection = {
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

export type OfferTerms = {
  duration: 3 | 5 | 7 | 14 | 21;
  apy: 120 | 140 | 180 | 200 | 240;
  principal: number;
};

export type Terms = {
  duration: number;
  apy: number;
  principal: number;
  interest?: number;
};

export type LtvTerms = {
  ltvBps: number;
  maxOffer: number | null;
};

export type Loan = {
  loanAccount: string;
  lender: string;
  borrower: string;
  mint: string;
  collectionConfig: string;
  status: Status;
  terms: Terms;
  creationTime: number;
  startTime: number;
  endTime: number;
  fox: boolean;
  mortgage: boolean;
  ltvTerms: LtvTerms | null;
};

export declare enum Status {
  WaitingForBorrower = "waitingForBorrower",
  WaitingForLender = "waitingForLender",
  Repaid = "repaid",
  Defaulted = "defaulted",
  Active = "active",
  OnSale = "onSale",
}
