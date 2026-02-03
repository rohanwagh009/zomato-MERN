const express = require('express');
const router = express.Router();
const foodPartnerController = require('../controllers/foodPartner.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { authFoodPartnerMiddleware } = require('../middlewares/auth.middleware');
const { authUserMiddleware } = require('../middlewares/auth.middleware');


router.get('/:id',authFoodPartnerMiddleware,foodPartnerController.getFoodPartnerProfile);

module.exports = router;
