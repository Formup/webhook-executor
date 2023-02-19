import express from 'express';
import config from '../config.json';
import { addToQueue } from '../queue';
import { getScriptFile } from '../valid';

const router = express.Router();

// eslint-disable-next-line
router.post('/', async (req, res) => {
    try {
        // eslint-disable-next-line
        const payload: any = req.body;
        // eslint-disable-next-line
        const scriptFile = getScriptFile(config, payload);

        if (!scriptFile) {
            res.status(404).send({ error: 'Invalid data' });
            return;
        }

        const result = await addToQueue(scriptFile);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
