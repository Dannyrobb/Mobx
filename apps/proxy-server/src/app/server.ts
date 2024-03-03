import express from 'express';
import cors from 'cors';
import { hcRoutes, rootRoutes } from './routes';

const app = express();

app.use(express.json());
app.use(
  cors({
    // origin: true,
    origin: 'http://localhost:5200',
  })
);

app.use('/api/v1/hc', hcRoutes);
app.use('/', rootRoutes);

export default app;
