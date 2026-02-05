const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");
const likeModel = require("../models/likes.model");


const upload = multer({
  Storage: multer.memoryStorage(),
});

/* POSt /api/food [protected]  */

router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

/* GET/api/food [protected]  */ 

router.get("/",foodController.getFoodItems)

router.post("/like",authMiddleware.authUserMiddleware,foodController.likeFood)

router.post('/save',authMiddleware.authUserMiddleware,foodController.saveFood)

router.get('/saved', authMiddleware.authUserMiddleware, foodController.getSavedFood)

router.get('/liked', authMiddleware.authUserMiddleware, foodController.getLikedFood)











module.exports = router;
