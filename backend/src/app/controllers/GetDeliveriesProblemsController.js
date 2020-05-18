import Delivery from '../models/Delivery';
import DeliveryProblems from '../models/DeliveryProblems';

class GetDeliveriesProblemsController {
  async index(req, res) {
    const page = req.query.page || 1;

    const problems = await DeliveryProblems.findAndCountAll({
      order: ['id'],
      attributes: ['id', 'description'],
      limit: 8,
      offset: (page - 1) * 8,
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id'],
        },
      ],
    });

    const totalPages = Math.ceil(problems.count / 8);

    return res.json({ ...problems, totalPages });
  }
}

export default new GetDeliveriesProblemsController();
