import {Request, Response} from 'express';
import { getRepository } from 'typeorm';

import { Role } from '../../models/Role';
import {Permission} from '../../models/Permission';

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

  async AddPermission(req: Request, res: Response){
    const repositoryRole = getRepository(Role);
    const repositoryPermission = getRepository(Permission);
    const { rolesId, permissionsId} = req.body;

    var id = rolesId;
    const role = await repositoryRole.findOne({where: {id}});
    id = permissionsId
    const permission = await repositoryPermission.findOne({where: {id}});

    const existRelation = role.permissions.find(permission => permission.id === permissionsId)
    if(existRelation){
      return res.sendStatus(409);
    }else{
      role.permissions = [...role.permissions, permission]
      await repositoryRole.save(role);

      return res.json(role);
    }    
  }

  async DeletePermission(req: Request, res: Response){
    const repositoryRole = getRepository(Role);

    const { rolesId, permissionsId} = req.body;
    var id = rolesId;
    const role = await repositoryRole.findOne({where: {id}});

    role.permissions = role.permissions.filter(permission => permission.id !== permissionsId)
    
    await repositoryRole.save(role);

    return res.json(role)
  }

  
}

export default new RoleController();