// frontend/js/chart.js

import { createChart } from "https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js";

let chart;
let lineSeries;

// ===== Initialize Chart =====
function initChart() {
    const chartContainer = document.getElementById("chart");
    chartContainer.innerHTML = ""; // Clear previous chart if any

    chart = LightweightCharts.createChart(chartContainer, {
        width: chartContainer.clientWidth,
        height: chartContainer.clientHeight,
        layout: {
            backgroundColor: "#0E0E0E",
            textColor: "#FFFFFF",
        },
        grid: {
            vertLines: { color: "#222" },
            horzLines: { color: "#222" },
        },
        rightPriceScale: { borderColor: "#222" },
        timeScale: { borderColor: "#222" },
    });

    lineSeries = chart.addLineSeries({
        color: "#0abb78",
        lineWidth: 2,
    });
}

// ===== Connect to Backend WebSocket =====
function connectPriceFeed(symbol = "R_100") {
    const ws = new WebSocket(`ws://localhost:5000`);

    ws.onopen = () => console.log("Connected to backend price feed");

    ws.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.price) {
            const time = Math.floor(Date.now() / 1000);
            lineSeries.update({ time, value: data.price });
        }
    };

    ws.onclose = () => {
        console.log("Price feed disconnected. Reconnecting in 3s...");
        setTimeout(() => connectPriceFeed(symbol), 3000);
    };
}

// ===== Handle Asset Clicks =====
function setupAssetClick() {
    const assets = document.querySelectorAll(".asset");
    assets.forEach((asset) => {
        asset.addEventListener("click", () => {
            const symbol = asset.dataset.symbol;
            alert(`Switched to ${symbol} chart`); // For now
            // TODO: implement backend symbol subscription if needed
        });
    });
}

// ===== Initialize =====
document.addEventListener("DOMContentLoaded", () => {
    initChart();
    connectPriceFeed();
    setupAssetClick();

    // Resize chart on window resize
    window.addEventListener("resize", () => {
        chart.applyOptions({ width: document.getElementById("chart").clientWidth });
    });
});
