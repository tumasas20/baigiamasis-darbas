const userSchema = require("../schema/userSchema")
const postSchema = require("../schema/postSchema")
const chatSchema = require("../schema/postSchema")
const { v4: uuidv4 } = require('uuid');
const Chat = require("../schema/chatSchema");
const chats = require("../chat.json")
const fs = require("fs")


// let chats = [];

module.exports = {
  getAllUsers: async (req, res) => {
    const users = await userSchema.find()
    res.send({ users })
  },
  getUserProfile: async (req, res) => {
    const { id } = req.params
    const user = await userSchema.findOne({ _id: id })
    console.log('userprofile', user);
    res.send({ user })
  },
  updateUserImage: async (req, res) => {
    const { id, image } = req.body
    const user = await userSchema.findOneAndUpdate(
      { _id: id },
      { image: image },
      { new: true }
    )
    console.log('updateUserImage', user);
    res.send({ user })
  },
  updateUserName: async (req, res) => {
    const { id, username } = req.body
    const user = await userSchema.findOneAndUpdate(
      { _id: id },
      { username: username },
      { new: true }
    )
    console.log('updateUsername', user);
    res.send({ user })
  },
  updateUserPass: async (req, res) => {
    const { id, password } = req.body
    const user = await userSchema.findOneAndUpdate(
      { _id: id },
      { password: password },
      { new: true }
    )
    console.log('updatePassword', user);
    res.send({ user })
  },
  getChat: async (req, res) => {
    const { id } = req.params
    const chat = await Chat.findOne({ _id: id })
    console.log('chat with id', chat);
    res.send({ chat })
    // const { id } = req.params
    // const chat = chats.find(x => x.id === id)
    // console.log(id);
    // res.send({ chat })
  },
  addMessage: async (req, res) => {
    const { id, message } = req.body
    console.log('message yra toks', message);

    const chat = await Chat.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          messages: {
            value: message.value,
            user: message.user,
            time: message.time,
            img: message.img
          }
        }
      },
      { new: true },

    );
    console.log('new message', chat);

    res.send({ chat: chat });
    // const { id, message } = req.body

    // const currentChatIndex = chats.findIndex(x => x.id === id)
    // console.log(currentChatIndex);
    // chats[currentChatIndex].messages.push(message)
    // console.log(chats);
    // fs.writeFile('chat.json', JSON.stringify(chats), (err) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.log('Chat data saved!');
    // });

    // res.send({ chat: chats[currentChatIndex] })
  },
  openChat: async (req, res) => {
    const { userOne, userTwo } = req.body
    const chatExist = await Chat.findOne({ participants: { $all: [userOne, userTwo] } });
    if (chatExist) {
      return res.send({ chatId: chatExist._id });
    }
    // Create a new chat document
    const singleChat = new Chat({
      participants: [userOne, userTwo],
      messages: []
    });
    // Save the new chat document to the database
    const savedChat = await singleChat.save();
    res.send({ chatId: savedChat._id });

    // const { userOne, userTwo } = req.body
    // const chatExist = chats.find(x => x.participants.includes(userTwo) && x.participants.includes(userOne))
    // if (chatExist) {
    //     return res.send({ chatId: chatExist.id })
    // }
    // const singleChat = {
    //     id: uuidv4(),
    //     participants: [
    //         userOne,
    //         userTwo
    //     ],
    //     messages: []
    // }
    // chats.push(singleChat)

    // fs.writeFile('../chat.json', JSON.stringify(chats), (err) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.log('Chat data saved!');
    // });

    // res.send({ chatId: singleChat.id })
  },
  getConversations: async (req, res) => {
    const conversations = await Chat.find()
    
    res.send({ chats: conversations })
  },
  deleteConversation: async (req, res) => {
    const { id } = req.params
    const deleteChat = await Chat.findByIdAndDelete({ _id: id })
    console.log(deleteChat);
    res.send({deleteChat})
  },

  getUsername: async (req, res) => {
    const { username } = req.params
    const user = await postSchema.findOne({ username: username })
    console.log("GET USERNAME", user);
    res.send({ user })
  },

  createPost: async (req, res) => {
    const { title, description, image } = req.body;
    const newPost = new postSchema({
      title, description, image
    })
    await newPost.save()
    const allPosts = await postSchema.find()
    res.send({ allPosts });
  },
  getPosts: async (req, res) => {
    const allPosts = await postSchema.find()
    console.log(allPosts);
    res.send({ allPosts })
  },
  getPost: async (req, res) => {
    const { id } = req.params
    const post = await postSchema.findOne({ _id: id })
    res.send({ post })
  },
  updatePost: async (req, res) => {
    const { id, title } = req.body
    const post = await postSchema.findOneAndUpdate(
      { _id: id },
      { title: title },
      { new: true }
    )
    res.send({ post })
  },
  updateImage: async (req, res) => {
    const { id, image } = req.body
    const post = await postSchema.findOneAndUpdate(
      { _id: id },
      { image: image },
      { new: true }
    )
    res.send({ post })
  },
  updateDesc: async (req, res) => {
    const { id, description } = req.body
    const post = await postSchema.findOneAndUpdate(
      { _id: id },
      { description: description },
      { new: true }
    )
    res.send({ post })
  }
}
