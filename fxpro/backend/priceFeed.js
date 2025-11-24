// priceFeed.js
import WebSocket, { WebSocketServer } from "ws";

let wss;

export function startPriceFeed() {
  // Use a dedicated port for WebSocket feed
  const PORT = process.env.WS_PORT || 8080;

  wss = new WebSocketServer({ port: PORT });
  console.log(`📡 WebSocket Price Feed running on port ${PORT}...`);

  wss.on("connection", (ws) => {
    console.log("New client connected to WebSocket feed");

    // Send random prices every second
    const sendPrices = setInterval(() => {
      const priceData = {
        symbol: "R_100",
        price: (Math.random() * 100).toFixed(2),
        timestamp: Date.now(),
      };
      ws.send(JSON.stringify(priceData));
    }, 1000);

    ws.on("close", () => {
      clearInterval(sendPrices);
      console.log("Client disconnected");
    });
  });
}
