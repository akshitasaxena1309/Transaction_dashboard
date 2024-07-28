const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  dateOfSale: { type: Date, required: true },
  sold: { type: Boolean, required: true },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
