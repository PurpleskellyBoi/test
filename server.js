const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/runpython', upload.single('filetoupload'), (req, res) => {
    const filePath = req.file.path;

    exec(`python -c "import main; main.pyMain('${filePath}')"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python file: ${error.message}`);
            res.status(500).send(`Error executing Python file: ${error.message}`);
            return;
        }
        console.log(`Python file output: ${stdout}`);
        console.error(`Python file errors: ${stderr}`);

        const csvFilePath = 'path/to/your/generated/csvfile.csv'; // Replace with the actual path to the generated CSV file
        const csvFileName = 'generatedfile.csv'; // Replace with the desired filename for the downloaded file

        res.download(csvFilePath, csvFileName, (err) => {
            if (err) {
                console.error(`Error downloading CSV file: ${err.message}`);
                res.status(500).send(`Error downloading CSV file: ${err.message}`);
            } else {
                console.log('CSV file downloaded successfully');
            }
        });
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
