// All TypeScript type definitions for option contracts, table rows, expiries, etc.
export interface OptionContractData {
    token: string;
    symbol: string;
    lot_size: number;
    strike: number;
    option_type: "CE" | "PE";
}

export interface OptionChain {
  strike: number[];
  call_close: number[];
  put_close: number[];
  call_timestamp: string[];
  put_timestamp: string[];
}

export interface OptionTableRow {
  token?: string;
  strike: number;
  call_close?: number;
  put_close?: number;
}

export interface WebSocketLtpUpdate {
  token: string;
  ltp: number;
  timestamp: string;
}

export interface ExpiryFilterProps {
  expiries: string[];
  selectedExpiry: string;
  onSelect: (expiry: string) => void;
}

export interface OptionTableProps {
  tableData: OptionTableRow[];
  loading?: boolean;
  error?: string | boolean | null;
  onRetry?: () => void; 
}
