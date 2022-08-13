const OrderhistoryController = require("../controllers/HistoryController")
const router = require("express").Router();

router.post("/addToHistory",OrderhistoryController.addToOrderhistory)
router.get("/allHistory",OrderhistoryController.getAllHistory)
router.get("/:id", OrderhistoryController.GetAnHistory)
router.put("/:id",OrderhistoryController.UpdateHistory)
router.delete("/:id",OrderhistoryController.DeleteFromOrderhistory)

module.exports = router