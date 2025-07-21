const DOMAIN = "prices.algotest.xyz";
const BASE_URL = `https://${DOMAIN}`;

export const CONTRACTS_API_URL = `${BASE_URL}/contracts?underlying=BANKNIFTY`;

export const OPTION_CHAIN_API_URL = `${BASE_URL}/option-chain-with-ltp?underlying=BANKNIFTY`;

export const WEBSOCKET_URL = `wss://${DOMAIN}/mock/updates`;