// Manages WebSocket connection and real-time updates for the option chain.
import { WebSocketLtpUpdate } from "../types/optionTypes";
import { WEBSOCKET_URL } from "../constants/urlContants";

type LtpUpdateCallback = (updates: Record<string, WebSocketLtpUpdate>) => void;

export class WebSocketService {
  private ws: WebSocket;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private expiry: string;
  private callback: LtpUpdateCallback;

  // Store WebSocket instance and connection state
  constructor(expiry: string, callback: LtpUpdateCallback) {
    this.expiry = expiry;
    this.callback = callback;
    this.ws = this.init();
  }

  // Method to connect and send subscription message
  private init() {
    //console.log("websockett init");
    const ws = new WebSocket(WEBSOCKET_URL);
    ws.onopen = () => {
      //console.log("websockett open");
      ws.send(JSON.stringify({
        msg: {
          type: "subscribe",
          datatypes: ["ltp"],
          underlyings: [
            {
              underlying: "BANKNIFTY",
              cash: true,
              options: [this.expiry],
            },
          ],
        }
      }));
    };

    // Listen for incoming LTP updates
    ws.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        const updates: Record<string, WebSocketLtpUpdate> = {};
        if (Array.isArray(data.ltp)) {
          data.ltp.forEach((item: WebSocketLtpUpdate) => {
            if (item.token) updates[item.token] = item;
          });
          //console.log("websocket data", updates);
          this.callback(updates);
        }
      } catch { /* Ignore invalid data */ }
    };
    ws.onerror = () => { this.reconnect(); };
    ws.onclose = () => { this.reconnect(); };
    return ws;
  }

  // Handle reconnects
  private reconnect() {
    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    this.reconnectTimeout = setTimeout(() => {
      this.ws = this.init();
    }, 3000);
  }

  //Handle cleanup, and closing connection
  public close() {
    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);

    this.ws.onopen = null;
    this.ws.onmessage = null;
    this.ws.onerror = null;
    this.ws.onclose = null;

    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        msg: {
          type: "unsubscribe",
          datatypes: ["ltp"],
          underlyings: [
            {
              underlying: "BANKNIFTY",
              cash: true,
              options: [this.expiry],
            },
          ],
        }
      }));
    }
    //console.log("closing websocket");
    this.ws.close();
  }
}
