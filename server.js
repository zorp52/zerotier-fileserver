const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 25565; // Minecraft port for familiarity, u can use any open port
const ZEROTIER_IP = 'IP';
const FILES_DIR = path.join(__dirname, 'files');

if (!fs.existsSync(FILES_DIR)) {
    fs.mkdirSync(FILES_DIR);
}

app.use(express.static(path.join(__dirname, 'public')));

// !TODO code is ugly, make nicer ty
// file list
app.get('/list-files', (req, res) => {
    fs.readdir(FILES_DIR, (err, files) => {
        if (err) {
            console.error('Error reading dir:', err);
            return res.status(500).send('Unable to scan dir');
        }
        res.json(files);
    });
});

// file uploader
const upload = multer({ dest: FILES_DIR }); 
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.send('File uploaded successfully!');
    } else {
        res.status(400).send('File upload failed.');
    }
});

// file downloader
app.get('/download/:filename', (req, res) => {
    const file_name = req.params.filename;
    const file_path = path.join(FILES_DIR, file_name);

    if (fs.existsSync(file_path)) {
        res.download(file_path, file_name);
    } else {
        res.status(404).send('File not found');
    }
});
console.log(FILES_DIR)

app.listen(PORT, ZEROTIER_IP, () => {
    console.log(`Server running at http://${ZEROTIER_IP}:${PORT}`);
});
