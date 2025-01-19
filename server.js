const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 25565; // Minecraft port for familiarity, you can use any open port
const ZEROTIER_IP = '10.147.17.187';
const FILES_DIR = path.join(__dirname, 'files');

if (!fs.existsSync(FILES_DIR)) {
    fs.mkdirSync(FILES_DIR);
}

app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FILES_DIR);
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname).toLowerCase();
        const basename = path.basename(file.originalname, extname); 
        cb(null, `${basename}${extname}`); 
    }
});

const upload = multer({ storage: storage });

app.get('/list-files', (req, res) => {
    fs.readdir(FILES_DIR, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).send('Unable to scan directory');
        }

        const fileList = files.map(file => {
            const stats = fs.statSync(path.join(FILES_DIR, file));
            return {
                name: file,
                size: stats.size,  
                timestamp: stats.mtime.getTime()
            };
        });

        res.json(fileList);
    });
});

app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        const uploadedFile = req.file;
        console.log(`Uploaded file: ${uploadedFile.originalname}`);
        res.status(200).send('File uploaded successfully!');
    } else {
        res.status(400).send('No file uploaded.');
    }
});


app.delete('/delete/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(FILES_DIR, fileName);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return res.status(500).send('Error deleting file');
        }
        res.send('File deleted successfully');
    });
});

app.get('/download/:filename', (req, res) => {
    const file_name = req.params.filename;
    const file_path = path.join(FILES_DIR, file_name);

    if (fs.existsSync(file_path)) {
        res.download(file_path, file_name);
    } else {
        res.status(404).send('File not found');
    }
});

console.log(FILES_DIR);

app.listen(PORT, ZEROTIER_IP, () => {
    console.log(`Server running at http://${ZEROTIER_IP}:${PORT}`);
});
