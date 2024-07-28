// src/components/TransactionStatistics.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TransactionStatistics.css";

const TransactionStatistics = ({ month }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get("http://localhost:3000/statistics", {
        params: { month },
      });

      setStatistics(response.data);
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
    }
  };

  return (
    <div className="transaction-statistics-container bg-gray-400 flex items-center flex-col">
      <div>
        <h2 className="text-3xl text-white font-bold pb-14">
          Transaction Statistics
        </h2>
      </div>
      <div className="statistics-box w-44">
        <div>
          <strong>Total Sale Amount:</strong> $
          {statistics.totalSaleAmount.toFixed(2)}
        </div>
        <div>
          <strong>Total Sold Items:</strong> {statistics.totalSoldItems}
        </div>
        <div>
          <strong>Total Not Sold Items:</strong> {statistics.totalNotSoldItems}
        </div>
      </div>
    </div>
  );
};

export default TransactionStatistics;
