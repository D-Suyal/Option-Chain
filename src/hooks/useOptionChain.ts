// Custom hook for fetching option contracts, handling expiry state, and subscribing to real-time LTP via WebSocket.
import { useEffect, useState, useRef, useCallback } from "react";
import { OptionChain, OptionContractData, OptionTableRow, WebSocketLtpUpdate } from "../types/optionTypes";
import { WebSocketService } from "../services/webSocketService";
import { CONTRACTS_API_URL, OPTION_CHAIN_API_URL } from "../constants/urlContants";
import { fetchWithTimeout, resetUpdatedContracts, getLatestTableData, getUpdatedContracts } from "../utils/optionTableDataUpdater";

// Fetch option contracts and listen for live updates via WebSocket.
// Expose state and handlers for expiry selection and table data.
export function useOptionChain() {

  // Define all states and handlers for option data
  const [validContracts, setValidContracts] = useState<Record<string, OptionContractData[]>>({});
  const [latestOptionChain, setLatestOptionChain] = useState<Record<string, OptionChain>>({});
  const [tableData, setTableData] = useState<OptionTableRow[]>([]);
  const [selectedExpiry, setSelectedExpiry] = useState<string>("");
  const [validExpiries, setValidExpiries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const wsRef = useRef<WebSocketService | null>(null);

  const fetchOptionChainData = useCallback(async () => {
    setLoading(true);
    try {
      const optionsContractRes = await fetchWithTimeout(CONTRACTS_API_URL);
      const optionsContractData = await optionsContractRes.json();
      setValidContracts(optionsContractData.BANKNIFTY.OPT);
      //console.log("valid Contracts", optionsContractData.BANKNIFTY.OPT);
  
      const expiries = Object.keys(optionsContractData.BANKNIFTY.OPT).sort();
      setValidExpiries(expiries);
      //console.log("expiries", expiries);

      const optionChainRes = await fetchWithTimeout(OPTION_CHAIN_API_URL);
      const optionChainData = await optionChainRes.json();
      setLatestOptionChain(optionChainData.options);
      //console.log("latest option chain", optionChainData.options)

      setSelectedExpiry(expiries[0]);
    } 
    catch (err: any) {
      setError("Failed to fetch option chain data.");
      setLoading(false);
    }
  }, []);

  // Fetch contracts on mount, handle loading and error states
  useEffect(() => {
    fetchOptionChainData();
  }, [fetchOptionChainData]);

  // Set up and tear down WebSocket connection for real-time updates
  useEffect(() => {
    if (!selectedExpiry || !latestOptionChain[selectedExpiry]) return;
    
    if (wsRef.current) wsRef.current.close();

    setLoading(true);

    //console.log("Sarting Websocket", selectedExpiry);
    resetUpdatedContracts();
    wsRef.current = new WebSocketService(selectedExpiry, (update: Record<string, WebSocketLtpUpdate>) => {
      setTableData(getLatestTableData(latestOptionChain[selectedExpiry], 
                        getUpdatedContracts(update, validContracts[selectedExpiry])));
      
      setLoading(false);
    });
  }, [selectedExpiry]);

  // Provide handlers and latest data to components
  return {
    validExpiry: validExpiries,
    selectedExpiry,
    setSelectedExpiry,
    latestTableData: tableData,
    loading,
    error,
    fetchOptionChainData
  };
}