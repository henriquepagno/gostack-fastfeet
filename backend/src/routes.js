import { Router } from 'express';
import multer from 'multer';
import multerconfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import AvatarController from './app/controllers/AvatarController';

const routes = new Router();
const upload = multer(multerconfig);

routes.post('/sessions', SessionController.store);

// Defines global authorization middleware to the following routes below.
routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliverymans', DeliverymanController.index);
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.delete);

routes.post(
  '/avatars/:deliverymanId',
  upload.single('file'),
  AvatarController.store
);

export default routes;
