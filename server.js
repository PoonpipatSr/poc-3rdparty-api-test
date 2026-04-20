import 'dotenv/config';
import app from './src/app.js';
import { PORT, CALLBACK_URL } from './src/config/env.js';

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});