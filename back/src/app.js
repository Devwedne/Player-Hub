import express from 'express';
import cors from 'cors';
import jogadoresRouter from './routes/jogadores.js';
import timesRouter from './routes/times.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);

app.use('/jogadores', jogadoresRouter);
app.use('/times', timesRouter);

app.get('/', (req, res) => {
  res.json({
    api: 'Player Hub API',
    versao: '1.0.0',
    rotas: ['/jogadores', '/times'],
  });
});

app.use(errorHandler);

export default app;
