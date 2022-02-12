import App from './App';
import { PORT } from './utils/EnvLoader';
import UserController from './controllers/User/user.controller';
import AuthController from './controllers/Authentication/auth.controller';

const app = new App(PORT, [
    new UserController('/user'),
    new AuthController()
]);
app.listen();