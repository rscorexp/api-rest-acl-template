import * as nodemailer from 'nodemailer';
import hogan from 'hogan.js';
import fs from 'fs';
import path from 'path';

class Email {
  transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f71c4440730083",
      pass: "61ef23430ee500"
    }
  });

  template(template: string){
    const file = fs.readFileSync(path.join(__dirname, `../views/template/email/${template}.hjs`), 'utf-8');
    return hogan.compile(file);
  } 

  

  send(object: object){
    return this.transport.sendMail(object);
  }
}

export default new Email();