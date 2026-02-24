const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//for achievement
//create collection achievemnt
mongoose.connect("mongodb://localhost:27017/storySdb");
const db = mongoose.connection;

db.once('open',()=>{
    console.log("Mongodb successfully connected");
})
const userSchema = mongoose.Schema({
    name:String,
    adm_no: String,
    desc1:String,
    file_path:String,
    category:String,
    status:{
        type:String,
        default:"pending"
    },
    role:{
        type:String,
        default:"user"
    },
},{timestamps:true});

const achievement = mongoose.model('achievements',userSchema);//like a collection
//crud
//create/insert
app.post("/submit",async(req,res)=>{
    let post;
    try{
        post = await achievement.create(req.body);
        res.json(post);
    }
    catch(err){
        res.status(400).send(err.message);
        }
});

//read
app.get("/all",async(req,res)=>{
    let post;
    try{
        post = await achievement.find();
        res.json(post)
    }
    catch(err){
        res.status(400).send(err.message);
    } 
});

//individual reading for each category
app.get('/all/:cat',async(req,res)=>{
    let post;
    try{
        post = await achievement.find({category:req.params.cat})
        res.json(post)
    }
    catch(err){
        res.status(400).send(err.message);
    }
});

//admin function
//to get all approved and denied post

app.get('/:status',async(req,res)=>{
    let p;
    try{
        p = await achievement.find({status:req.params.status});
        res.json(p);
    }
    catch(err){
        res.status(400).send("Error");
    }
});

//update status to approved
app.patch('/approve/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const post = await achievement.findByIdAndUpdate(id,{status:'approved'});
        res.status(200).send('Done');
    }
    catch(err){
        res.status(400).send(err.message)
    }
} );
//deny
app.patch('/deny/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const post = await achievement.findByIdAndUpdate(id,{status:'denied'});
        res.status(200).send('Done');
    }
    catch(err){
        res.status(400).send(err.message)
    }
} );
// delete post
app.delete('/delete/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const post = await achievement.findByIdAndDelete(id);
        res.status(200).send('Deleted');
    }
    catch(err){
        res.status(400).send(err.message)
    }
} );

//for login(to find admin or not)
const loginSchema = mongoose.Schema({
    Email:String,
    Password:String,
    role:{
        type:String,
        default:'user'
    }
});
const login = mongoose.model('login',loginSchema);
app.post('/register',async(req,res)=>{
    try{
        await login.create(req.body);
        res.status(200).json({message:"Register successfull"});
    }
    catch(e){
        res.status(400).json({message:"Registration failed"});
    }
})

app.post('/login',async(req,res)=>{
    let user;
    try{
        user=await login.findOne(req.body);//checks if db has email and password as given in login
        if(!user){
            res.status(400).json({message:"Invalid credentials"})
        }
        else{
            res.status(200).json({message:"Success",role:user.role});
        }
    }
    catch(e){
        res.status(400).json({message:"Server Error"})
    }
})
app.listen(2000,()=>{
    console.log("Server is connected Port 2000");
})