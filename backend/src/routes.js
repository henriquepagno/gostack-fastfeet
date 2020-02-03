import { Router } from 'express';

import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

// Defines global authorization middleware to the following routes below.
routes.use(authMiddleware);

// routes.post();
// routes.put();

export default routes;
