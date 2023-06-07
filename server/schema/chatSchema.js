const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    participants: [{
        type: String,
        required: true
    }],
    messages: [{
        value: {
            type: String,
            require: true
        },
        user: {
            type: String,
            require: false
        },
        time: {
            type: String,
            require: false
        },
        img: {
            type: String,
            require: false
        },
    }]
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;