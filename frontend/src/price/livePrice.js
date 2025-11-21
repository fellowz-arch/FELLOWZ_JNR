let socket;
let callbacks = [];

export const connectPriceFeed = () => {
  socket = new WebSocket("ws://localhost:5000");

  socket.onmessage = (msg) => {
    const { price } = JSON.parse(msg.data);
    callbacks.forEach((cb) => cb(price));
  };
};

export const onPriceUpdate = (callback) => {
  callbacks.push(callback);
};
