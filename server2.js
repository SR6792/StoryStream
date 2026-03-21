const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// --- STATIC FILE SERVING ---
// Use path.join to ensure the path is correct relative to this file
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'frontend')));


// 2. Update the Multer storage destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Just use the folder name
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

// --- MONGODB CONNECTION ---
mongoose.connect("mongodb://65.0.75.47:27017/storySdb");
const db = mongoose.connection;
db.once('open', () => {
    console.log("Mongodb successfully connected to storySdb on AWS");
});

// --- SCHEMAS & MODELS ---
const userSchema = mongoose.Schema({
    name: String,
    adm_no: String,
    desc1: String,
    file_path: String,
    category: String,
    status: { type: String, default: "pending" },
    role: { type: String, default: "user" },
}, { timestamps: true });

const achievement = mongoose.model('achievements', userSchema);

const loginSchema = mongoose.Schema({
    Email: String,
    Password: String,
    role: { type: String, default: 'user' }
});

const login = mongoose.model('login', loginSchema);

// --- ACHIEVEMENT ROUTES ---

// 3. Update the /submit route to save a clean URL path
app.post("/submit", upload.single('file'), async (req, res) => {
    try {
        const data = {
            name: req.body.fullname,
            adm_no: req.body.adm_no,
            desc1: req.body.desc,
            category: req.body.category,
            // Force the path to be a URL-friendly string starting with /uploads/
            file_path: req.file ? `/uploads/${req.file.filename}` : ""
        };
        const post = await achievement.create(data);
        res.redirect('/user.html');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Read All
app.get("/all", async (req, res) => {
    try {
        const post = await achievement.find();
        res.json(post);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Individual reading by category
app.get('/all/:cat', async (req, res) => {
    try {
        const post = await achievement.find({ category: req.params.cat });
        res.json(post);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get by Status (approved/denied)
app.get('/:status', async (req, res) => {
    try {
        const p = await achievement.find({ status: req.params.status });
        res.json(p);
    } catch (err) {
        res.status(400).send("Error");
    }
});

// Update status to Approved
app.patch('/approve/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await achievement.findByIdAndUpdate(id, { status: 'approved' });
        res.status(200).send('Done');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Update status to Denied
app.patch('/deny/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await achievement.findByIdAndUpdate(id, { status: 'denied' });
        res.status(200).send('Done');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete Post
app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await achievement.findByIdAndDelete(id);
        res.status(200).send('Deleted');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// --- AUTHENTICATION ROUTES ---

app.post('/register', async (req, res) => {
    try {
        const existing = await login.findOne({ Email: req.body.Email });
        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }
        await login.create(req.body);
        res.status(200).json({ message: "Register successful" });
    } catch (e) {
        res.status(400).json({ message: "Registration failed" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = await login.findOne(req.body);
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
        } else {
            res.status(200).json({ message: "Success", role: user.role });
        }
    } catch (e) {
        res.status(400).json({ message: "Server Error" });
    }
});



// --- ROOT ROUTE ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// --- START SERVER ---
app.listen(2000, () => {
    console.log("Server is running on Port 2000");
});