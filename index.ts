import { prisma } from './lib/prisma';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import applicationsRouter from './routes/application.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api',applicationsRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Server is shutting down...');
  await prisma.$disconnect();
  process.exit(0);
});

