import express from 'express';

import authRoutes from './routes/practice/auth-test-route.js';
import userRoutes from './routes/practice/user-route.js';

import integrationRoutes from './routes/practice/integrationRoutes.js';

import msRoutes from './routes/auth-ms-route.js'

const app = express();

app.use(express.json());

app.get('/health-check', (req, res) => {
    res.send("Test test test OK !!!!!!")
})

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use('/api/integration', integrationRoutes);

app.use('/api/auth', msRoutes);

export default app;