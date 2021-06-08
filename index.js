import express from 'express';
import instaRoute from './routes/instaRoute.js';
import databaseRoute from './routes/databaseRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const url = process.env.DB_CONNECTION;

app.use(express.json());
app.use(cors());

app.use('/instasave', instaRoute);
app.use('/databaseR', databaseRoute);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Active' });
});

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running with db on ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
