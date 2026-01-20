const express = require('express')
const foodController = require("../controllers/food.controler")
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router()


/* POSt /api/food [protected]  */

router.post('/',authMiddleware.authFoodPartnerMiddleware, foodController.createFood)


module.exports = router