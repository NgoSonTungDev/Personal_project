const MovieController = require("../controllers/MovieController")
const router = require("express").Router();

router.post("/add-movie",MovieController.addMovie)
router.get("/all-movie",MovieController.getAll)
router.get("/:id",MovieController.GetAnMovie)
router.put("/:id",MovieController.UpdateMovie)
router.delete("/:id",MovieController.deleteMovie)


module.exports = router