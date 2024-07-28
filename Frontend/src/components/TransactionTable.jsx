// src/components/TransactionTable.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TransactionTable.css";

const TransactionTable = ({ month, onMonthChange }) => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, [page, search, month]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:3000", {
        params: { page, perPage, search, month },
      });

      setTransactions(response.data.transactions);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page when search changes
  };

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    onMonthChange(newMonth); // Notify parent component of month change
    setPage(1); // Reset to first page when month changes
  };

  const handleNextPage = () => {
    if (page < Math.ceil(total / perPage)) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="transaction-table-container">
      <h2 className="text-3xl ">Transactions</h2>

      <div className="controls text-xl flex justify-end">
        <label>
          Select Month:
          <select
            className="text-center pageno"
            value={month}
            onChange={handleMonthChange}
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </label>

        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <table className="text-center">
        <thead>
          <tr className="text-xl text-white">
            <th className=" bg-gray-400">ID</th>
            <th className=" bg-gray-400">Title</th>
            <th className=" bg-gray-400">Description</th>
            <th className=" bg-gray-400">Price</th>
            <th className=" bg-gray-400">Category</th>
            <th className=" bg-gray-400">Date of Sale</th>
            <th className=" bg-gray-400">Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination flex items-center justify-center">
        <button
          className="text-xl"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-xl pageno">
          Page {page} of {Math.ceil(total / perPage)}
        </span>
        <button
          className="text-xl"
          onClick={handleNextPage}
          disabled={page >= Math.ceil(total / perPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
