import 'dotenv/config';
import express from 'express';
import hooksRouter from './routes/hooks';

const app = express();
const PORT = process.env.PORT || 5000;

console.log('Testing server...');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/log-github-webhook', hooksRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
