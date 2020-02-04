import { Router } from 'express';

import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import RecipientController from './app/controllers/RecipientController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

// Defines global authorization middleware to the following routes below.
routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

export default routes;
