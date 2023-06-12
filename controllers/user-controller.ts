import { Request, Response } from 'express';
import User from '../models/User';
import { v4 as uuidv4 } from 'uuid';

export class UserController {
  public static async getUser(req: Request, res: Response): Promise<void> {
    try {
      res.json(User.findAll());
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  }

  public static async getUserById(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;

    try {
      const user = await User.findByPk(userId);

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  }

  public static async addUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
      const newUser = await User.create({
        id: uuidv4(),
        name,
        email,
        password,
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Failed to add user' });
    }
  }
}
