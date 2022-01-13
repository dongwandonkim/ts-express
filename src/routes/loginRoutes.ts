import { Request, Response, Router } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  if (
    email &&
    password &&
    email === 'test@test.com' &&
    password === 'pass1234'
  ) {
    req.session = { loggedIn: true };
    console.log(req.session);
    res.redirect('/');
  } else {
    res.send('email not provided');
  }
});

router.get('/', (req: RequestWithBody, res: Response) => {
  const { session } = req;
  if (session && session.loggedIn) {
    res.send(`
      <div>
        <div> You are logged in</div>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <div> You are not logged in</div>
        <a href="/login">login</a>
      </div>
    `);
  }
});

router.get('/logout', (req: RequestWithBody, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

export { router };
