const jwt = require("jsonwebtoken")
const BadRequest = require("../errors")


const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequest("Please provide username and password");
  }

  const id = new Date().getDate();
  //try to keep payload small so that user can experience better
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `hello , ${req.user.username}`,
    secret: `here is your lucky number and authorized data ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
