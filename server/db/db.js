const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/todoData').then(() => {
    console.log("DB connected...");
}).catch((err) => {
    console.log(err);
})

const todoScema = new mongoose.Schema({
    todo: {
        type: String,
        require:[true,"Todo must be not Blank"]
    }
})


const Todo = mongoose.model('todo', todoScema)

module.exports = Todo