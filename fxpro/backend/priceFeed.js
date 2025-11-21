// backend/priceFeed.js
import { WebSocket, WebSocketServer } from "ws";

export const startPriceFeed = (server) => {
  // Create WebSocket server for frontend clients
  const wss = new WebSocketServer({ server });

  console.log("📡 WebSocket Price Feed running...");

  // Connect to Deriv Public Feed
  const derivWS = new WebSocket(
    "wss://ws.binaryws.com/websockets/v3?app_id=1089"
  );

  derivWS.on("open", () => {
    console.log("✅ Connected to Deriv Price Feed");

    // Subscribe to R_100 ticks
    derivWS.send(
      JSON.stringify({
        ticks: "R_100",
        subscribe: 1,
      })
    );
  });

  derivWS.on("message", (stream) => {
    const priceData = JSON.parse(stream);

    if (priceData.tick) {
      const price = priceData.tick.quote;

      // Broadcast price to all connected frontend clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ price }));
        }
      });
    }
  });

  derivWS.on("close", () => {
    console.log("⚠️ Deriv Price Feed disconnected. Reconnecting...");
    setTimeout(() => startPriceFeed(server), 5000);
  });

  derivWS.on("error", (err) => {
    console.error("❌ Deriv WS Error:", err.message);
  });

  wss.on("connection", (ws) => {
    console.log("👤 New client connected to FX PRO price feed");

    ws.on("close", () => {
      console.log("👤 Client disconnected");
    });
  });
};
