import {Request, Response} from 'express';
import { getRepository } from 'typeorm';

import { User } from '../../models/User';

class UserController {

  async index(req: Request, res: Response) {
    const repository = getRepository(User);

    const users = await repository.find();
    console.log(users)
    return res.status(200).json(users);

  }

  async store(req: Request, res: Response){
    const repository = getRepository(User);
    const {email, name, password} = req.body;

    const userExists = await repository.findOne({where: {email}});

    if(userExists){
      return res.sendStatus(409).json({message: "esse e-mail ja esta cadastrado!"});
    }

    const user = repository.create({email, name, password});
    await repository.save(user);

    return res.status(201).json(user);
  }

  async show(req: Request, res: Response){
    const repository = getRepository(User);
    const {id} = req.body;
    const user = await repository.findOne({id});

    if(!user){
      return res.status(404).send({ message:"usuário nao encontrado" })
    }

    return res.status(200).json(user);
  }
}

export default new UserController();