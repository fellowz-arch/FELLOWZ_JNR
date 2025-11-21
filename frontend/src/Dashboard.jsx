import React from "react";
import { Line } from "react-chartjs-2";

const Dashboard = () => {
  const data = {
    labels: Array.from({ length: 10 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Portfolio Value",
        data: Array.from({ length: 10 }, () => Math.random() * 100 + 100),
        borderColor: "#00aaff",
        backgroundColor: "rgba(0, 170, 255, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>
      <div className="card" style={{ marginBottom: "20px" }}>
        <Line data={data} />
      </div>
      <div className="card">Account Balance: $1000</div>
      <div className="card">Open Trades: 2</div>
      <div className="card">Recent Activity</div>
    </div>
  );
};

export default Dashboard;
