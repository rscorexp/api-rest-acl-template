import {Request, Response, NextFunction} from 'express';
import { getRepository, getConnection } from 'typeorm';

import {User} from '../models/User';
import {Role} from '../models/Role';

export default function permissionMiddleware(permissionName: String){
  return async function(req: Request, res: Response, next: NextFunction){
    
    

    try{
      const user = await getConnection().manager.findOne(User, req.userId);
      user.roles = await getConnection().createQueryBuilder().relation(User, "roles").of(user).loadMany();

      const role = await getConnection().manager.findOne(Role, user.roles[0].id);
      role.permissions = await getConnection().manager.createQueryBuilder().relation(Role, "permissions").of(role).loadMany();

      const RoleName = user.roles[0].name;

      if(RoleName == "super_admin"){
        return next();
      }

      role.permissions.map( p => {
        if(p.name === permissionName){
          return next();
        }
        return res.sendStatus(401)
      })
    } catch(err){
      return res.send(err);
    }
    
  }
}