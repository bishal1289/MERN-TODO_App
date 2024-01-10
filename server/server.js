const express = require('express');
const cors = require("cors");
const app = express();
const Todo = require('./db/db')


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors());

app.use(express.static('public'))

app.post('/add', async (req, res) => {
    console.log(req.body.todo);
    const todo = new Todo({ todo: req.body.todo})
    await todo.save();

    let data = await Todo.find({});
    console.log(data)
    res.json(data);
})

app.get('/get', async (req, res) => {
    let data = await Todo.find({});
    res.json(data);
    
})

app.delete('/delete', async (req, res) => {
    let _id = req.body.id;
    console.log(req.body.id);
    let updateData = await Todo.findByIdAndDelete(_id);
    res.json(updateData);
})



app.listen(3001, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Server Started...");
    }
})