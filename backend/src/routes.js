import { Router } from 'express';
import multer from 'multer';
import multerconfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import AvatarController from './app/controllers/AvatarController';
import NotificationController from './app/controllers/NotificationController';
import DeliveryController from './app/controllers/DeliveryController';
import GetDeliveryController from './app/controllers/GetDeliveryController';
import WithdrawalDeliveryController from './app/controllers/WithdrawalDeliveryController';
import CompleteDeliveryController from './app/controllers/CompleteDeliveryController';
import SignatureController from './app/controllers/SignatureController';

const routes = new Router();
const upload = multer(multerconfig);

routes.post('/sessions', SessionController.store);

// Defines global authorization middleware to the following routes below.
routes.use(authMiddleware);

// Recipient
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

// Deliveryman
routes.get('/deliverymans', DeliverymanController.index);
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.delete);

// Delivery
routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

routes.get(
  '/deliveries/deliveryman/:deliverymanId/deliveries',
  GetDeliveryController.index
);

routes.put(
  '/deliveries/withdrawal/:deliveryId',
  WithdrawalDeliveryController.update
);

routes.put(
  '/deliveries/complete/:deliveryId',
  CompleteDeliveryController.update
);

// Notification
routes.get('/notifications/:deliverymanId', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// File
routes.post(
  '/deliverymans/:deliverymanId/avatar',
  upload.single('file'),
  AvatarController.store
);

routes.post(
  '/deliveries/:deliveryId/signature',
  upload.single('file'),
  SignatureController.store
);

export default routes;
