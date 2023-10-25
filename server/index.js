const express = require('express');
const cors = require('cors');
const mmongoose = require('mongoose');
const { default: mongoose } = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());
const POST = process.env.PORT || 8080;
//shema
const schemaData = mmongoose.Schema({
    name: String,
    age: Number,
    email: String
},{
    timestamps: true
})
const userModel = mmongoose.model("user", schemaData)
//read
//http://localhost:8080/
app.get('/', async(req, res) => {
    const data = await userModel.find({});
    res.json({success: true, data : data});
})
// create data || save data in database
app.post('/create',async(req, res) => {
    console.log(req.body);
    const data = new userModel(req.body);
    await data.save(); 
    res.send({success: true, message: "data save susscessfully",data : data});
})
//update data
app.put('/update',async(req, res) => {
    console.log(req.body);
    const {_id,...rest} = req.body
    console.log(rest);
    const data = await userModel.updateOne({_id: _id},rest);
    res.send({success: true, message: "data update susscessfully",data : data})
    
})
//delete data
app.delete('/delete/:id',async(req, res) => {
    const id = req.params.id;
    console.log(id);
    const data = await userModel.deleteOne({_id:id});
    res.send({success: true, message: "data delete susscessfully",data : data})

})

mongoose.connect('mongodb+srv://hungnemo190502:12345@marketplace.dtzcf4i.mongodb.net/crud?retryWrites=true&w=majority')
.then(() => {
    console.log("database connected")
    app.listen(POST,()=>console.log("Server running on port 8080"));
})
.catch((err) => console.log(err));