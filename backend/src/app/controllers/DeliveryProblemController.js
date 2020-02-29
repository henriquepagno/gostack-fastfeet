import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblems';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

import Queue from '../../lib/Queue';
import DeliveryCancelationMail from '../jobs/DeliveryCancelationMail';

class DeliveryProblemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { deliveryId } = req.params;

    const deliveryExists = await Delivery.findByPk(deliveryId);

    if (!deliveryExists) {
      return res
        .status(400)
        .json({ error: `Delivery with id ${deliveryId} not found.` });
    }

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id: deliveryId,
      description: req.body.description,
    });

    return res.json(deliveryProblem);
  }

  async delete(req, res) {
    const { deliveryProblemId } = req.params;

    const deliveryProblem = await DeliveryProblem.findByPk(deliveryProblemId);

    if (!deliveryProblem) {
      return res.status(400).json({
        error: `Delivery problem with id ${deliveryProblemId} not found.`,
      });
    }

    const delivery = await Delivery.findByPk(deliveryProblem.delivery_id);

    // Check if delivery has already been collected
    if (delivery.canceled_at) {
      return res.status(401).json({ error: 'Delivery already canceled.' });
    }

    const deliveryman = await Deliveryman.findByPk(delivery.deliveryman_id);
    const recipient = await Recipient.findByPk(delivery.recipient_id);

    await delivery.update({ canceled_at: new Date() });

    await Queue.add(DeliveryCancelationMail.key, {
      delivery,
      recipient,
      deliveryman,
    });

    return res.json(delivery);
  }
}

export default new DeliveryProblemController();
