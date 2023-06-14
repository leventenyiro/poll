const express = require('express');
const userRouter = require('./routes/user-router');
const db = require('./models');

const app = express();
const port = 3000;

db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

app.use(express.json());

app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
