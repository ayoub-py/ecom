const userService = require("../services/userService");

const getUsersList = async (req,res) =>{
  try{
    const result = await userService.getUsersList();
    res.json(result)
  }catch(error){
    return res.status(500).json(error)
  }
}

const registerUser = async (req, res) => {
  await userService.registerUser(req,res);
};


const loginUser = async (req, res) => {
  await userService.loginUser(req,res);
};


module.exports = {getUsersList, registerUser, loginUser };
