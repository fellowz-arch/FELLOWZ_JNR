import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { connectPriceFeed, onPriceUpdate } from "../price/livePrice";

const LiveChart = () => {
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  useEffect(() => {
    connectPriceFeed();

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 400,
      layout: { background: { color: "#0e0e0e" }, textColor: "#d1d1d1" },
      grid: { vertLines: { color: "#181818" }, horzLines: { color: "#181818" } },
    });

    const lineSeries = chart.addLineSeries({
      color: "#ff444f",
      lineWidth: 2,
    });

    seriesRef.current = lineSeries;

    let time = Math.floor(Date.now() / 1000);

    onPriceUpdate((p) => {
      lineSeries.update({ time, value: p });
      time++;
    });
  }, []);
const [livePrice, setLivePrice] = useState(0);

useEffect(() => {
  onPriceUpdate((p) => setLivePrice(p));
}, []);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};
<h3>Current Price: <span style={{ color: "#ff444f" }}>{livePrice}</span></h3>

export default LiveChart;
