const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/runpython', upload.single('filetoupload'), (req, res) => {
    const filePath = req.file.path;
    const fileName = path.basename(filePath);

    exec(`python -c "import main; main.pyMain('${filePath}')"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python file: ${error.message}`);
            res.status(500).send(`Error executing Python file: ${error.message}`);
            return;
        }
        console.log(`Python file output: ${stdout}`);
        console.error(`Python file errors: ${stderr}`);
        res.send(`Python file output: ${stdout}`);
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
