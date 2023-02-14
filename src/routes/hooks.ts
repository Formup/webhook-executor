import express from 'express';
import config from '../config.json';
import { updateQueue } from '../queue';

const router = express.Router();

type ObjectTypes = { [key: string]: ObjectTypes } | string | number | boolean;

// eslint-disable-next-line
router.post('/', async (req, res) => {
    try {
        // eslint-disable-next-line
        const payload: Record<string, ObjectTypes> = req.body;

        const isValidData = (
            match: Record<string, ObjectTypes>,
            payload: Record<string, ObjectTypes>
        ): boolean => {
            return Object.entries(match).every(([key, value]) => {
                if (typeof value === 'object') {
                    return isValidData(
                        value as Record<string, ObjectTypes>,
                        payload[key] as Record<string, ObjectTypes>
                    );
                }

                return payload[key] === value;
            });
        };

        if (!isValidData(config.match, payload)) {
            res.status(400).send('Invalid data');
            return;
        }

        const result = await updateQueue();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
