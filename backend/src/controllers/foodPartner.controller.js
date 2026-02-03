const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

module.exports.getFoodPartnerProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const foodPartner = await foodPartnerModel.findById(id);

        if (!foodPartner) {
            return res.status(404).json({ message: 'Food Partner not found' });
        }

        const foodItems = await foodModel.find({ foodPartner: id });

        // Merge foodItems into the partner object for the frontend to consume
        const profileData = {
            ...foodPartner.toObject(),
            foodItems: foodItems
        };

        res.status(200).json({ foodPartner: profileData });

    } catch (error) {
        console.error("Error fetching food partner profile:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
