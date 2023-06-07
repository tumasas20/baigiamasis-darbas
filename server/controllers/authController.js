const userSchema = require("../schema/userSchema")

module.exports = {
  register: async (req, res) => {
    const {
      username,
      passOne: password,
      image = 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png' 
    } = req.body;
    const newUser = new userSchema({
      username, password, image
    })
    await newUser.save()
    res.send({ success: true });
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const userExist = await userSchema.findOne({ username: username, passOne: password })
    console.log(userExist);
    if (userExist) {
      res.send({ success: true, user: userExist })
    } else {
      res.send({ success: false })
    }
  }
}