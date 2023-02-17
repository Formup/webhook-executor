import 'dotenv/config';
import express from 'express';
import hooksRouter from './routes/hooks';

const app = express();
const PORT = process.env.PORT || 5000;

console.log('Testing server4...');

app.use(express.json());
app.use('/hooks', hooksRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
