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
import GetDeliveriesProblemsController from './app/controllers/GetDeliveriesProblemsController';
import GetDeliveryProblemController from './app/controllers/GetDeliveryProblemController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

const routes = new Router();
const upload = multer(multerconfig);

routes.post('/sessions', SessionController.store);

routes.get('/deliverymen/:id', DeliverymanController.show);

routes.get(
  '/deliveries/deliveryman/:deliverymanId/deliveries',
  GetDeliveryController.index
);

routes.put(
  '/deliveries/withdrawal/:deliveryId',
  WithdrawalDeliveryController.update
);

routes.post('/delivery/:deliveryId/problems', DeliveryProblemController.store);

routes.get(
  '/delivery/:deliveryId/problems',
  GetDeliveryProblemController.index
);

routes.post(
  '/deliveries/:deliveryId/signature',
  upload.single('file'),
  SignatureController.store
);

routes.put(
  '/deliveries/complete/:deliveryId',
  CompleteDeliveryController.update
);

// Defines global authorization middleware to the following routes below.
routes.use(authMiddleware);

// Recipient
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

// Deliveryman
routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

// Delivery
routes.get('/deliveries/problems', GetDeliveriesProblemsController.index);

routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:id', DeliveryController.show);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

routes.delete(
  '/problem/:deliveryProblemId/cancel-delivery',
  DeliveryProblemController.delete
);

// Notification
routes.get('/notifications/:deliverymanId', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// File
routes.post(
  '/deliverymen/:deliverymanId/avatar',
  upload.single('file'),
  AvatarController.store
);

export default routes;
