const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");



async function createFood(req, res) {
  console.log(req.foodPartner);

  console.log(req.body);
  console.log(req.file);

  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid(),
  );

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  console.log(fileUploadResult);

  res.status(201).json({
    message:"Food created successfully",
    food: foodItem
  });
}

async function getFoodItems(req,res){
  const foodItems = await foodModel.find({})
  res.status(200).json({
    message:"Food items fetched successfully",
    foodItems
  })
}

async function likeFood(req,res){
  const {foodId} = req.body

  const user = req.user

  const isAlreadyLiked = await likeModel.findOne({user: user._id, food: foodId})

  if(isAlreadyLiked){
    await likeModel.deleteOne({user: user._id, food: foodId})
    await foodModel.findByIdAndUpdate(foodId,{
      $inc: {likeCount: -1  }
    })  
    return res.status(200).json({
      message:"Food unliked successfully"
    })
  }

  const like = await likeModel.create({
    user: user._id,
    food: foodId
  })

  await foodModel.findByIdAndUpdate(foodId,{
    $inc: {likeCount: 1  }
  })

  res.status(201).json({
    message:"Food liked successfully",
    like
  })

}

async function saveFood(req,res){
  const {foodId} = req.body

  const user = req.user

  const isAlreadySaved = await saveModel.findOne({user: user._id, food: foodId})

  if(isAlreadySaved){
    await saveModel.deleteOne({user: user._id, food: foodId})
    return res.status(200).json({
      message:"Food unsaved successfully"
    })
  }

  const save = await saveModel.create({
    user: user._id,
    food: foodId
  })

  res.status(201).json({
    message:"Food saved successfully",
    save
  })  
}

async function getSavedFood(req, res) {
  const user = req.user;
  const savedItems = await saveModel.find({ user: user._id }).populate('food');
  
  res.status(200).json({
    message: "Saved food items fetched successfully",
    savedItems
  });
}

async function getLikedFood(req, res) {
  const user = req.user;
  const likedItems = await likeModel.find({ user: user._id });
  
  res.status(200).json({
    message: "Liked food items fetched successfully",
    likedItems
  });
}


module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSavedFood,
  getLikedFood
};
