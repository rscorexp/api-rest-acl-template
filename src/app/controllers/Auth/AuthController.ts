import {Request, Response} from 'express';
import { getRepository, getConnection } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../../models/User';

class AuthController {

  async index(req: Request, res: Response){
    const user = await getConnection().manager.findOne(User, req.userId);

    user.roles = await getConnection().createQueryBuilder().relation(User, "roles").of(user).loadMany();
    return res.json(user)
  }

  async auth(req: Request, res: Response){
    const repository = getRepository(User);
    const {email, password} = req.body;

    const user = await repository.findOne({where: {email}});

    if(!user){
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
      return res.sendStatus(401);
    }

    const token = jwt.sign({ id: user.id}, process.env.TOKEN_JWT_SECRET, { expiresIn: '1d' });

    console.log(`✔ ${email} se autenticou no sistema!`);

    delete user.password;

    return res.json({ user, token })
  }
}

export default new AuthController();