const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//to start db connection

const db = new sqlite3.Database("./mydb.db",(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("sql connected");
        db.run(`create table if not exists msg(msgid varchar(20),name varchar(20),adm_no varchar(10),suggestion varchar(2000),dos date );`);
    }
});

//to get recent post
app.get('/recent',(req,res)=>{
    db.all('Select * from msg order by dos desc limit 4 ',
        (err,rows)=>{
            if(err){
                console.log(err);
                res.status(500).json({error:err.message});
            }
            else{
                res.json(rows);
            }
        })
})

//to get all post
app.get('/all',(req,res)=>{
    db.all(`Select * from msg order by dos desc`,(err,rows)=>{
        if(err) {
            console.log(err);
            res.status(500).json({error:err.message});
        }
        else{
            res.json(rows);
        }
    });
});

//to post/enter a request by user
// db.post('')
app.listen(2000,console.log('Port running at 2000'));