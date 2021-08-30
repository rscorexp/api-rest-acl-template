import {Request, Response} from 'express';
import { getRepository } from 'typeorm';

import { User } from '../../models/User';
import { Role } from '../../models/Role';

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
      return res.status(404).send({ message:"usuário não encontrado" })
    }

    return res.status(200).json(user);
  }

  async addRole(req: Request, res: Response){
    try {
      const repositoryUser = getRepository(User);
      const repositoryRole = getRepository(Role);
      const { userId, rolesId} = req.body;

      var id = userId;
      const user = await repositoryUser.findOne({where: {id}});

      const existRelation = user.roles.find(role => role.id === rolesId)
      if(existRelation){
        return res.sendStatus(409);
      }else{
        id = rolesId
        const role = await repositoryRole.findOne({where: {id}});
        user.roles = [role]

        await repositoryUser.save(user);

        return res.json({message: "Ok"});
      }
      
    }catch(err){
      return res.sendStatus(409).json({message: "Algo deu errado!"});
    }

  }

  async removeRole(req: Request, res: Response){
    try {
      const repositoryUser = getRepository(User);

      const { userId, rolesId} = req.body;
      var id = userId;
      const user = await repositoryUser.findOne({where: {id}});

      user.roles = user.roles.filter(role => role.id !== rolesId)
      
      await repositoryUser.save(user);

      return res.json({message: "Ok"})
    }catch(err){
      return res.sendStatus(409).json({message: "Algo deu errado!"});
    }
  }
}

export default new UserController();