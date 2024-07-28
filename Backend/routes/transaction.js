const express = require("express");
const router = express.Router();
const controller = require("../controllers/Control");

router.get("/init", controller.init);
router.get("/", controller.page);
router.get("/statistics", controller.statistics);
router.get("/bar-chart", controller.barChart);
module.exports = router;
