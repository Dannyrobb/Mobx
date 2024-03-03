import app from './server';
import dotenv from 'dotenv';
import colors from 'colors';
import { config as cfg } from './config/config';

const port = cfg.port || 5201;

app.listen(port, () => {
  console.log(colors.cyan(`\n> Server is   istening on port ${port}`));
});
