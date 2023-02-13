import express from 'express';
import { updateQueue } from '../queue';

const router = express.Router();

// eslint-disable-next-line
router.post('/', async (req, res) => {
    try {
        const result = await updateQueue();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
