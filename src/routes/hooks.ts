import express from 'express';
import config from '../config.json';
import { addToQueue } from '../queue';
import { isValidData, DataTypes } from '../valid';

const router = express.Router();

// eslint-disable-next-line
router.post('/', async (req, res) => {
    try {
        // eslint-disable-next-line
        const payload: Record<string, DataTypes> = req.body;

        if (!isValidData(config.match, payload)) {
            res.status(400).send({ error: 'Invalid data' });
            return;
        }

        const result = await addToQueue();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
