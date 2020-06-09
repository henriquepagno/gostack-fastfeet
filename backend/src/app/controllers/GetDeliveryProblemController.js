import DeliveryProblems from '../models/DeliveryProblems';

class GetDeliveryProblemController {
  async index(req, res) {
    const page = req.query.page || 1;

    const { deliveryId } = req.params;

    const deliveryProblems = await DeliveryProblems.findAndCountAll({
      where: {
        delivery_id: deliveryId,
      },
      order: ['id'],
      attributes: ['id', 'description', 'created_at'],
      limit: 8,
      offset: (page - 1) * 8,
    });

    const totalPages = Math.ceil(deliveryProblems.count / 8);

    return res.json({ ...deliveryProblems, totalPages });
  }
}

export default new GetDeliveryProblemController();
