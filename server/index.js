const express =require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const cors=require("cors")
const model=require('./models/model')

const app=express();
app.use(bodyParser.json());
app.use(cors());

var connectDb=()=>{
mongoose.connect('mongodb://127.0.0.1:27017/todo_test').then((res)=>{
    console.log('database connected')
}).catch((err)=>{
    console.log(err)
})
}

app.post('/api/tasks', async (req, res) => {
    try {
        const newTask = new model(req.body);
        await newTask.save();
        res.json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating' });
    }
});

app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await model.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ' });
    }
});

app.put('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await model.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating ' });
    }
});


app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await model.findByIdAndDelete(id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ' });
    }
});


app.listen(6000,()=>{
    console.log("server is running on port 6000")
    connectDb()

})