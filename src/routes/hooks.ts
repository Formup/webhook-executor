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

        const getMatchData = () => {
            for (const match of config.matches) {
                if (match.ref === payload.ref) {
                    return match;
                }
            }

            return 'Match not found';
        };

        const getScriptFile = () => {
            return new Promise((resolve, reject) => {
                for (const script of config.scripts) {
                    if (script.ref === payload.ref) {
                        resolve(script.file);
                        return;
                    }
                }

                reject('Script not found');
            });
        };

        const matchData: any = getMatchData();

        if (!matchData) {
            res.status(404).send({ error: 'Match data not found' });
            return;
        }

        // eslint-disable-next-line
        if (!isValidData(matchData, payload)) {
            res.status(400).send({ error: 'Invalid data' });
            return;
        }

        const scriptFile: any = await getScriptFile();

        if (!scriptFile) {
            res.status(404).send({ error: 'Script file not found' });
            return;
        }

        // eslint-disable-next-line
        const result = await addToQueue(scriptFile);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
