import express from 'express';
import usersRouter from './routes/usersRouter.js';
import weatherRouter from './routes/weatherRouter.js';

import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); 

const PORT = process.env.PORT || 5050;

const app = express();
//middleware
app.use(cors());
app.use(express.json())

app.use("/users", usersRouter);
app.use("/weather", weatherRouter);




//listening
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

