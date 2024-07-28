// src/App.js

import React, { useState } from "react";
import "./App.css";
import TransactionTable from "./components/TransactionTable";
import TransactionStatistics from "./components/TransactionStatistics";
import TransactionsBarChart from "./components/TransactionsBarChart";

function App() {
  const [month, setMonth] = useState("March");

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-5xl text-center bg-gray-400 text-white p-6 top-0">
          Transaction Dashboard
        </h1>
      </header>
      <TransactionTable month={month} onMonthChange={setMonth} />
      <TransactionStatistics month={month} />
      <TransactionsBarChart month={month} />
    </div>
  );
}

export default App;
