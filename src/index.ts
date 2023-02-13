import 'dotenv/config';
import express from 'express';
import hooksRouter from './routes/hooks';

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/hooks', hooksRouter);

app.post('/log-github-webhook', (req, res) => {
    // eslint-disable-next-line
    const payload = req.body;
    console.log(payload);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
