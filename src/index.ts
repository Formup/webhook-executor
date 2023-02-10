import 'dotenv/config';
import express from 'express';
import { exec } from 'child_process';

const app = express();

app.get('/webhooks', (req, res) => {
    let fileType = '.bat';

    if (process.platform !== 'win32') {
        fileType = '.sh';
    }

    exec(
        `${__dirname}/scripts/test-echo${fileType}`,
        (error, stdout, stderr) => {
            if (error) {
                console.error(error.message);
                return;
            }

            if (stderr) {
                console.error(stderr);
                return;
            }

            res.status(200).send(stdout);
        }
    );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
