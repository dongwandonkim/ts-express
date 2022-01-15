import { NextFunction, Request, Response } from 'express';
import { controller, get, use } from './decorators';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send(`
      <div>
        <div> You are not allowed</div>
        <a href="/auth/login">login</a>
      </div>
    `);
};

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    const { session } = req;
    if (session && session.loggedIn) {
      res.send(`
      <div>
        <div> You are logged in</div>
        <a href="/auth/logout">Logout</a>
      </div>
    `);
    } else {
      res.send(`
      <div>
        <div> You are not logged in</div>
        <a href="/auth/login">login</a>
      </div>
    `);
    }
  }
  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('you are allowed');
  }
}
