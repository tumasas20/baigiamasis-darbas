const express = require('express')
const authController = require('../controllers/authController')
const generalController = require('../controllers/generalController')
const router = express.Router()


router.post("/register", authController.register)
router.post("/login", authController.login)

router.get("/getUsers", generalController.getAllUsers)
router.get("/userProfile/:id", generalController.getUserProfile)

router.post("/posts", generalController.createPost)
router.get("/getPosts", generalController.getPosts)
router.get("/post/:id", generalController.getPost)

router.get("/getChat/:id", generalController.getChat)
router.get("/getConversations", generalController.getConversations)

router.post("/addMessage", generalController.addMessage)
router.post("/openChat", generalController.openChat)

router.delete("/deleteChat/:id", generalController.deleteConversation)

router.get("/user/:username", generalController.getUsername)

router.post("/updatePost", generalController.updatePost)
router.post("/updateImage", generalController.updateImage)
router.post("/updateDesc", generalController.updateDesc)

router.post("/updateProfileImage", generalController.updateUserImage)
router.post("/updateUserName", generalController.updateUserName)
router.post("/updateUserPass", generalController.updateUserPass)

module.exports = router