import {Request, Response} from 'express';
import { getRepository } from 'typeorm';

import {Permission} from '../../models/Permission';

class PermissionController {
  async index(req: Request, res: Response){
    const repository = getRepository(Permission);

    const permissions = await repository.find();
    return res.json(permissions);
  }

  async store(req: Request, res: Response){
    const repository = getRepository(Permission);

    const { name } = req.body;

    const permissionExists = await repository.findOne({where: {name}});

    if(permissionExists){
      return res.sendStatus(409);
    }

    const permission = repository.create({name});
    await repository.save(permission);

    return res.json(permission);
  }  
}

export default new PermissionController();