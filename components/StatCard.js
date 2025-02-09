import React from "react";

const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <h2>{value.toLocaleString()}</h2>
    <p>{title}</p>
  </div>
);

export default StatCard;
