import dotenv from 'dotenv';

dotenv.config();

export const port: number = Number(process.env.PORT);

if (!port) throw new Error(`No PORT, can't build`);

export const config = Object.freeze({
  port,
});
