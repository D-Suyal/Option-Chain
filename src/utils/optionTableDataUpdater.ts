import { OptionContractData, OptionTableRow, OptionChain, WebSocketLtpUpdate } from "../types/optionTypes";
import { SHOW_EMPTY_DATA } from "../config/config";

let updatedContracts_wrt_Strike = new Map<number, OptionTableRow>();

export function resetUpdatedContracts() {
    updatedContracts_wrt_Strike = new Map<number, OptionTableRow>();
}

export function getUpdatedContracts( webSocketRes: Record<string, WebSocketLtpUpdate>, 
                              optionContracts: OptionContractData[]) 
                              : Map<number, OptionTableRow> {
  const receivedTokens = Object.keys(webSocketRes);

  optionContracts.forEach((contract) => {
    if (receivedTokens.includes(contract.token)) {
      if (updatedContracts_wrt_Strike.has(contract.strike)) {
        const optionTableRow : OptionTableRow = {
          token: contract.token,
          strike: contract.strike,
          call_close: contract.option_type == "CE" ? Math.round(webSocketRes[contract.token].ltp * 100) / 100 : updatedContracts_wrt_Strike.get(contract.strike)?.call_close,
          put_close: contract.option_type == "PE" ? Math.round(webSocketRes[contract.token].ltp * 100) / 100 : updatedContracts_wrt_Strike.get(contract.strike)?.put_close,
        }
        updatedContracts_wrt_Strike.set(contract.strike, optionTableRow);
      }
      else {
        const optionTableRow : OptionTableRow = {
          token: contract.token,
          strike: contract.strike,
          call_close: contract.option_type == "CE" ? Math.round(webSocketRes[contract.token].ltp * 100) / 100 : undefined,
          put_close: contract.option_type == "PE" ? Math.round(webSocketRes[contract.token].ltp * 100) / 100 : undefined,
        }
        updatedContracts_wrt_Strike.set(contract.strike, optionTableRow);
      }
      //console.log("updated val : ", contract.strike, " call : ", updatedContracts_wrt_Strike.get(contract.strike)?.call_close, ", put : ", updatedContracts_wrt_Strike.get(contract.strike)?.put_close);
    }
    else {
      const optionTableRow : OptionTableRow = {
        token: contract.token,
        strike: contract.strike,
        call_close: updatedContracts_wrt_Strike.get(contract.strike)?.call_close,
        put_close: updatedContracts_wrt_Strike.get(contract.strike)?.put_close,
      }
      updatedContracts_wrt_Strike.set(contract.strike, optionTableRow);
    }
  });

  return updatedContracts_wrt_Strike;
}

export function getLatestTableData(latestOptionChain: OptionChain, updatedContracts_wrt_Strike: Map<number, OptionTableRow> = new Map<number, OptionTableRow>()) : OptionTableRow[] {
  let tableData : OptionTableRow[] = new Array();

  latestOptionChain.strike.forEach((strike, idx) =>{
    //console.log("CHECK CASE => strike : ", strike, " call_close (updated) : ", updatedContracts_wrt_Strike.get(strike)?.call_close, " put_close (updated) : ", updatedContracts_wrt_Strike.get(strike)?.put_close);
    if (updatedContracts_wrt_Strike.get(strike)?.call_close == undefined || updatedContracts_wrt_Strike.get(strike)?.call_close == null) {
      //console.log("UNDEFINED CASE CALL => strike : ", strike, " call_close (updated) : ", updatedContracts_wrt_Strike.get(strike)?.call_close, " call_close (latest) : ", latestOptionChain.call_close[idx]);
      updatedContracts_wrt_Strike.set(strike, {
        token: updatedContracts_wrt_Strike.get(strike)?.token,
        strike: strike,
        call_close: latestOptionChain.call_close[idx],
        put_close: updatedContracts_wrt_Strike.get(strike)?.put_close
      });
    }
    if (updatedContracts_wrt_Strike.get(strike)?.put_close == undefined || updatedContracts_wrt_Strike.get(strike)?.put_close == null) {
      //console.log("UNDEFINED CASE PUT => strike : ", strike, " put_close (updated) : ", updatedContracts_wrt_Strike.get(strike)?.put_close, " put_close (latest) : ", latestOptionChain.put_close[idx]);
      updatedContracts_wrt_Strike.set(strike, {
        token: updatedContracts_wrt_Strike.get(strike)?.token,
        strike: strike,
        call_close: updatedContracts_wrt_Strike.get(strike)?.call_close,
        put_close: latestOptionChain.put_close[idx]
      });
    }
  });

  const sortedEntries = Array.from(updatedContracts_wrt_Strike.entries()).sort((a, b) => a[0] - b[0]);
  sortedEntries.forEach(([strike, tableRowData]) => {
    if (SHOW_EMPTY_DATA) {
      tableData.push(tableRowData);
    } else if (tableRowData.call_close != null || tableRowData.put_close != null) {
      tableData.push(tableRowData);
    }
  });

  return tableData;
}