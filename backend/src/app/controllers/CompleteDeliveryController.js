import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class CompleteDeliveryController {
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

    // Check if delivery has already been finished
    if (delivery.end_date) {
      return res.status(401).json({ error: 'Delivery already finished.' });
    }

    await delivery.update({ end_date: new Date() });

    return res.json(delivery);
  }
}

export default new CompleteDeliveryController();
