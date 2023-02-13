import 'dotenv/config';
import express from 'express';
import { updateQueue } from './queue';

const app = express();
const PORT = process.env.PORT || 5000;

// eslint-disable-next-line
app.post('/webhooks', async (req, res) => {
    try {
        const result = await updateQueue();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
