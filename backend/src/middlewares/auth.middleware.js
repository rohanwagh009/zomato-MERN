const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;   // token is grabbed here

  if (!token) {                                 // what if token didnt came
    return res.status(401).json({
      message: "Please login first",
    });
  }


  // if token came then need to check, accessing data using decoded data
  // then setting a new property in the request object, foodPartners data is set to request basically


  try {                                                            
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await foodPartnerModel.findOne(decoded.id)

    req.foodpartner = foodPartner

    next()


  } catch (err) {
    // if token is wrong then this part handles it
    return res.status(401).json({

      message:"JSON invalid token"
    })
  }
}


module.exports = {
  authFoodPartnerMiddleware
}
