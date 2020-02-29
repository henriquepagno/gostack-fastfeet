import { Op, literal } from 'sequelize';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class GetDeliveriesProblemsController {
  async index(req, res) {
    const page = req.query.page || 1;

    const deliveries = await Delivery.findAndCountAll({
      where: {
        [Op.and]: literal(
          `exists (select 1 from "delivery_problems" AS "DeliverProblems" where "DeliverProblems"."delivery_id" = "Delivery"."id")`
        ),
      },
      order: ['id'],
      attributes: ['id', 'product', 'recipient_id', 'start_date', 'end_date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
      ],
    });

    const totalPages = Math.ceil(deliveries.count / 20);

    return res.json({ ...deliveries, totalPages });
  }
}

export default new GetDeliveriesProblemsController();
