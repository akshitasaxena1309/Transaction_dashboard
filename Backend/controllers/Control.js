const Transaction = require("../models/Transaction");
const axios = require("axios");

exports.init = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;

    await Transaction.deleteMany({});
    await Transaction.insertMany(transactions);

    res.status(200).json({ message: "Database initialized with seed data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to initialize the database" });
  }
};

exports.page = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = "", month = "March" } = req.query;

    // Convert month name to number
    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1; // Month number (1-12)

    // Use aggregation to filter by month
    const aggregationPipeline = [
      {
        $addFields: {
          monthOfSale: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          monthOfSale: monthNumber,
          $or: [
            { title: new RegExp(search, "i") },
            { description: new RegExp(search, "i") },
            { price: isNaN(search) ? undefined : Number(search) },
          ].filter(Boolean),
        },
      },
      {
        $project: {
          monthOfSale: 0, // Exclude the added field from the final output
        },
      },
      {
        $skip: (page - 1) * perPage,
      },
      {
        $limit: Number(perPage),
      },
    ];

    const transactions = await Transaction.aggregate(aggregationPipeline);
    const totalPipeline = [
      {
        $addFields: {
          monthOfSale: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          monthOfSale: monthNumber,
          $or: [
            { title: new RegExp(search, "i") },
            { description: new RegExp(search, "i") },
            { price: isNaN(search) ? undefined : Number(search) },
          ].filter(Boolean),
        },
      },
      {
        $count: "totalCount",
      },
    ];

    const totalResult = await Transaction.aggregate(totalPipeline);
    const total = totalResult[0]?.totalCount || 0;

    res.status(200).json({
      transactions,
      total,
      page: Number(page),
      perPage: Number(perPage),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

exports.statistics = async (req, res) => {
  try {
    const { month = "March" } = req.query;

    // Convert month name to number
    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1; // Month number (1-12)

    // Use aggregation to calculate statistics
    const aggregationPipeline = [
      {
        $addFields: {
          monthOfSale: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          monthOfSale: monthNumber,
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: { $cond: ["$sold", "$price", 0] } },
          totalSoldItems: { $sum: { $cond: ["$sold", 1, 0] } },
          totalNotSoldItems: { $sum: { $cond: ["$sold", 0, 1] } },
        },
      },
    ];

    const result = await Transaction.aggregate(aggregationPipeline);

    const statistics = result[0] || {
      totalSaleAmount: 0,
      totalSoldItems: 0,
      totalNotSoldItems: 0,
    };

    res.status(200).json(statistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch statistics" });
  }
};

exports.barChart = async (req, res) => {
  try {
    const { month = "March" } = req.query;

    // Convert month name to number
    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1; // Month number (1-12)

    // Use aggregation to calculate price ranges
    const priceRanges = [
      { range: "0 - 100", min: 0, max: 100 },
      { range: "101 - 200", min: 101, max: 200 },
      { range: "201 - 300", min: 201, max: 300 },
      { range: "301 - 400", min: 301, max: 400 },
      { range: "401 - 500", min: 401, max: 500 },
      { range: "501 - 600", min: 501, max: 600 },
      { range: "601 - 700", min: 601, max: 700 },
      { range: "701 - 800", min: 701, max: 800 },
      { range: "801 - 900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: Infinity },
    ];

    const aggregationPipeline = [
      {
        $addFields: {
          monthOfSale: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          monthOfSale: monthNumber,
        },
      },
      {
        $facet: {
          ranges: priceRanges.map(({ range, min, max }) => ({
            $addFields: {
              inRange: {
                $and: [{ $gte: ["$price", min] }, { $lte: ["$price", max] }],
              },
            },
          })),
          data: [
            {
              $group: {
                _id: "$price",
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
    ];

    const [result] = await Transaction.aggregate(aggregationPipeline);

    const rangeCounts = priceRanges.map(({ range }, index) => ({
      range,
      count: result.data.filter(
        (d) =>
          d._id >= priceRanges[index].min && d._id <= priceRanges[index].max
      ).length,
    }));

    res.status(200).json(rangeCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch bar chart data" });
  }
};
