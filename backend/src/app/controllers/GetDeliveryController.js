import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class GetDeliveryController {
  async index(req, res) {
    const page = req.query.page || 1;
    const { delivered } = req.query;

    const whereStatement = { deliveryman_id: req.params.deliverymanId };

    whereStatement.canceled_at = null;

    whereStatement.end_date = delivered === 'true' ? { [Op.ne]: null } : null;

    const deliveries = await Delivery.findAndCountAll({
      where: whereStatement,
      order: ['id'],
      attributes: [
        'id',
        'product',
        'recipient_id',
        'signature_id',
        'start_date',
        'end_date',
        'canceled_at',
        'createdAt',
        'status',
      ],
      limit: 4,
      offset: (page - 1) * 4,
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'city',
            'state',
            'number',
            'street',
            'zipcode',
            'formatted_zipcode',
          ],
        },
      ],
    });

    const totalPages = Math.ceil(deliveries.count / 4);

    return res.json({ ...deliveries, totalPages });
  }
}

export default new GetDeliveryController();
