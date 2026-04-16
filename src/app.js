import express from 'express';
import authRoutes from './routes/auth-route.js';
import userRoutes from './routes/user-route.js';

const app = express();

app.use(express.json());

app.get('/health-check', (req, res) => {
    res.send("Test test test OK !!!!!!")
})

app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes);

export default app;