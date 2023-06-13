import express from 'express';
import User from './models/User';

const app = express();
const port = 3000;

// Synchronize the models with the database
(async () => {
  try {
    await sequelize.sync(); // This ensures that the tables are created in the database
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

// Routes
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
