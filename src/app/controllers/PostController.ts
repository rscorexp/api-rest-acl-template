import {Request, Response} from 'express';

class PostController {
  store(req: Request, res: Response,){
    return res.send('ok')
  }
}

export default new PostController();