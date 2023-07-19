import mongoose from "mongoose"
import User from '../models/auth.js'

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        const allUserDetails  = []
        allUsers.forEach(user =>
          {
    
            allUserDetails.push({_id: user._id, name:user.name, about:user.about, tags:user.tags, joinedOn: user.joinedOn, plan:user.plan})
            
            
        })
        return res.status(200).json(allUserDetails)
    } catch (error) {
      console.log(error)
        return res.status(400).json({message:error.message})

    }
}

export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("question unavailable...");
    }
  
    try {
      const updatedProfile = await User.findByIdAndUpdate(
        _id,
        { $set: { name: name, about: about, tags: tags } },
        { new: true }
      );
      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(405).json({ message: error.message });
    }
  };
  
  function addDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
  }
export const addUserPlan = async (ourPlan, userId)=>{
  try {
    console.log('userId:', userId)
    const {planName,amount,noOfQuestions,validity}  = ourPlan;
    const today = new Date()
    const startedOn = new Date()
    const validTill = addDays(today, validity)
    const res = await User.updateOne({_id:userId}, {$push:{plan:{planName, amount, noOfQuestions, startedOn, validTill}}})
    return 1;
  } catch (error) {
    console.log(error)
    return 0;
  }
}