import { WebSocketLtpUpdate } from "../types/optionTypes";
import { WEBSOCKET_URL } from "../constants/urlContants";

type LtpUpdateCallback = (updates: Record<string, WebSocketLtpUpdate>) => void;

export class WebSocketService {
  private ws: WebSocket;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private expiry: string;
  private callback: LtpUpdateCallback;

  constructor(expiry: string, callback: LtpUpdateCallback) {
    this.expiry = expiry;
    this.callback = callback;
    this.ws = this.init();
  }

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

  private reconnect() {
    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    this.reconnectTimeout = setTimeout(() => {
      this.ws = this.init();
    }, 3000);
  }

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
