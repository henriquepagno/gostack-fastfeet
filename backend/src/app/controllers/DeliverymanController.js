import { Op } from 'sequelize';
import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { page } = req.query;

    const whereStatement = req.query.q
      ? { name: { [Op.iLike]: `%${req.query.q}%` } }
      : null;

    const deliverymans = await Deliveryman.findAndCountAll({
      where: whereStatement,
      order: ['name'],
      attributes: ['id', 'name', 'email'],
      limit: page ? 8 : null,
      offset: page ? (page - 1) * 8 : null,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    const totalPages = Math.ceil(deliverymans.count / 8);

    return res.json({ ...deliverymans, totalPages });
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res
        .status(400)
        .json({ error: `Deliveryman with id ${id} not found` });
    }

    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists' });
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.json(deliveryman);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { email, name } = req.body;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res
        .status(400)
        .json({ error: `Deliveryman with id ${id} not found` });
    }

    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({
        where: { email },
      });

      if (deliverymanExists) {
        return res.status(400).json({
          error: 'Deliveryman already exists with that email',
        });
      }
    }

    await deliveryman.update(req.body);

    return res.json({ id, name, email });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res
        .status(400)
        .json({ error: `Deliveryman with id ${id} not found` });
    }

    await deliveryman.destroy();

    return res.json();
  }
}

export default new DeliverymanController();
