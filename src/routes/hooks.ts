import express from 'express';
import { addToQueue } from '../queue';
import { getFilePath } from '../script';
import fs from 'fs';

const router = express.Router();

const argvConfig = process.argv.pop();
// eslint-disable-next-line
const configFile = fs.readFileSync(`${argvConfig}`);
// eslint-disable-next-line
const config = JSON.parse(configFile.toString());

router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line
        const body = req.body;
        // eslint-disable-next-line
        const filePath = getFilePath(config, body);

        if (!filePath) {
            res.status(404).send({ error: 'Invalid data' });
            return;
        }

        addToQueue(filePath);
        res.status(202).send({ success: 'Added to queue' });
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
