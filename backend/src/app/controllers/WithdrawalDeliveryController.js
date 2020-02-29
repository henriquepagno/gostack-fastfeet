import * as Yup from 'yup';
import { Op } from 'sequelize';
import {
  startOfDay,
  endOfDay,
  isAfter,
  isBefore,
  setSeconds,
  setMinutes,
  setHours,
} from 'date-fns';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class WithdrawalDeliveryController {
  async update(req, res) {
    const schema = Yup.object().shape({
      deliverymanId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Check if deliveryman exists
    const deliveryman = await Deliveryman.findByPk(req.body.deliverymanId);

    if (!deliveryman) {
      return res.status(401).json({
        error: `Deliveryman with id ${req.body.deliverymanId} not found.`,
      });
    }

    const { deliveryId } = req.params;
    const date = new Date();

    const delivery = await Delivery.findOne({
      where: {
        id: deliveryId,
        deliveryman_id: req.body.deliverymanId,
      },
    });

    if (!delivery) {
      return res.status(400).json({
        error: `Delivery with id ${deliveryId} for deliveryman with id ${req.body.deliverymanId} not found.`,
      });
    }

    // Check if time is betweeen 08:00 and 18:00
    const firstTime = setSeconds(setMinutes(setHours(date, '08'), '00'), 0);
    const finalTime = setSeconds(setMinutes(setHours(date, '18'), '00'), 0);

    if (isBefore(date, firstTime) || isAfter(date, finalTime)) {
      return res.status(401).json({
        error: 'Withdrawls can only be made between 08:00 and 18:00.',
      });
    }

    // Check how many withdrawals have already been made in the current day
    const deliveries = await Delivery.count({
      where: {
        deliveryman_id: req.body.deliverymanId,
        start_date: {
          [Op.between]: [startOfDay(date), endOfDay(date)],
        },
      },
    });

    if (deliveries >= 5) {
      return res.status(401).json({
        error: "You can't withdraw more than five deliveries per day.",
      });
    }

    // Check if delivery has already been collected
    if (delivery.start_date) {
      return res.status(401).json({ error: 'Delivery already withdrawn.' });
    }

    await delivery.update({ start_date: date });

    return res.json(delivery);
  }
}

export default new WithdrawalDeliveryController();
