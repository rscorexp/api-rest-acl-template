import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import Email from "../../../utils/Email";

import {User} from "../../models/User";

class ForgotPassword {
  async create(req: Request, res: Response){
    const repository = getRepository(User);
    const { email } = req.body;
    
    try{

      const user = await repository.findOne({where: {email}});

      if(!user){
        return res.sendStatus(409).json({message: "e-mail não encontrado"});
      }

      const newPassword = crypto.randomBytes(8).toString("hex");

      const sendEmail = await Email.send({
        from: 'NoReply <d88b412bb6-97c2d9@inbox.mailtrap.io>',
        to: email,
        subject: "Recuperação de senha",
        html: Email.template('recover').render({newPassword})
      });

      if(!sendEmail){
        return res.json({message: "não foi possível enviar o email"});
      }

      const password = await bcrypt.hash(newPassword, 8);
      await repository.update(user.id, { password });

      return res.json({message: 'E-mail enviado'});

    }catch(err) {
      console.log('error');
      return res.status(404).json({message: err.message});
    }
  }
}

export default new ForgotPassword();