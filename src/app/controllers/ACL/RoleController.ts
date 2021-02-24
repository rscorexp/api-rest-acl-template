import {Request, Response} from 'express';
import { getRepository } from 'typeorm';

import { Role } from '../../models/Role';

class RoleController {

  async index(req: Request, res: Response){
    const repository = getRepository(Role);

    const roles = await repository.find();
    return res.json(roles);
  }

  async store(req: Request, res: Response){
    const repository = getRepository(Role);

    const { name } = req.body;

    const roleExists = await repository.findOne({where: {name}});

    if(roleExists){
      return res.sendStatus(409);
    }

    const role = repository.create({name});
    await repository.save(role);

    return res.json(role);
  }  
}

export default new RoleController();