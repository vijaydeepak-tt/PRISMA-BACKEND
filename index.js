const express = require('express');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie middleware
app.use(cookieParser());

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
app.use('/api', userRouter);
app.use('/api', postRouter);

// Rest API requests
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(3100, () => {
  console.log('Server running on PORT 3100');
});
