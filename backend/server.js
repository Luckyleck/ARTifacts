const express = require('express');
const app = express();

app.get('/', logger, (req, res) => {
  console.log('Here');
});

const userRouter = requre('./routes/api/users');

app.use('/users', userRouter);

app.listen(5000);