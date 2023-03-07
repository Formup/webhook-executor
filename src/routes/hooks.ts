import express from 'express';
import config from '../../config.json';
import { addToQueue } from '../queue';
import { getFilePath } from '../script';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        // eslint-disable-next-line
        const body: any = req.body;
        // eslint-disable-next-line
        const filePath = getFilePath(config, body);

        if (!filePath) {
            res.status(404).send({ error: 'Invalid data' });
            return;
        }

        // eslint-disable-next-line
        const startTime = performance.now();
        const result = await addToQueue(filePath);
        const endTime = performance.now();
        console.log(`${filePath}(${Math.floor(endTime - startTime)} ms)`);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
