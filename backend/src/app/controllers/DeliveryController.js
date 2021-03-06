import { Op } from 'sequelize';
import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Notification from '../schemas/Notification';
import File from '../models/File';

import DeliveryConfirmationMail from '../jobs/DeliveryConfirmationMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const page = req.query.page || 1;

    const whereStatement = req.query.q
      ? { product: { [Op.iLike]: `%${req.query.q}%` } }
      : null;

    const deliveries = await Delivery.findAndCountAll({
      where: whereStatement,
      order: ['id'],
      attributes: [
        'id',
        'product',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
        'canceled_at',
        'start_date',
        'end_date',
        'status',
      ],
      limit: 8,
      offset: (page - 1) * 8,
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email', 'avatar_id'],
          include: {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          },
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

    const totalPages = Math.ceil(deliveries.count / 8);

    return res.json({ ...deliveries, totalPages });
  }

  async show(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(delivery);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Check if recipient exists
    const recipient = await Recipient.findOne({
      where: {
        id: req.body.recipient_id,
      },
    });

    if (!recipient) {
      return res.status(401).json({
        error: `Recipient with id ${req.body.recipient_id} not found.`,
      });
    }

    // Check if deliveryman exists
    const deliveryman = await Deliveryman.findOne({
      where: {
        id: req.body.deliveryman_id,
      },
    });

    if (!deliveryman) {
      return res.status(401).json({
        error: `Deliveryman with id ${req.body.deliveryman_id} not found.`,
      });
    }

    const delivery = await Delivery.create(req.body);

    await Notification.create({
      content: `The product ${req.body.product} to ${recipient.name} is available to withdrawal.`,
      deliveryman: deliveryman.id,
    });

    await Queue.add(DeliveryConfirmationMail.key, {
      delivery,
      recipient,
      deliveryman,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res
        .status(400)
        .json({ error: `Delivery with id ${id} not found.` });
    }

    // Check if recipient exists
    const recipient = await Recipient.findOne({
      where: {
        id: req.body.recipient_id,
      },
    });

    if (!recipient) {
      return res.status(401).json({
        error: `Recipient with id ${req.body.recipient_id} not found.`,
      });
    }

    // Check if deliveryman exists
    const deliveryman = await Deliveryman.findOne({
      where: {
        id: req.body.deliveryman_id,
      },
    });

    if (!deliveryman) {
      return res.status(401).json({
        error: `Deliveryman with id ${req.body.deliveryman_id} not found.`,
      });
    }

    await delivery.update(req.body);

    return res.json(delivery);
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res
        .status(400)
        .json({ error: `Delivery with id ${id} not found.` });
    }

    await delivery.destroy();

    return res.json();
  }
}

export default new DeliveryController();
