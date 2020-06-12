const PORT = process.env.PORT || 3000;
const express = require('express');
const compression = require('compression');
const app = express();
var fs = require('fs');

const path = require('path');
const multer = require('multer');


app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/upload', upload.single('userFile'), (req, res) => {
    console.log(req.file);
    upload.single(req.file);
    console.log(`Storage location ${req.hostname}/${req.file.path}`);
    return res.send(req.file)
});

app.listen(PORT, () => console.log(`Server is up port: ${PORT}`));
