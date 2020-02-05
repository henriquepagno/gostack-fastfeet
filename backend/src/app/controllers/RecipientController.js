import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string()
        .min(2)
        .max(2)
        .required(),
      city: Yup.string().required(),
      zipcode: Yup.string()
        .min(8)
        .max(8)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }

    const {
      id,
      name,
      street,
      number,
      complemnt,
      state,
      city,
      zipcode,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complemnt,
      state,
      city,
      zipcode,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().nullable(false),
      street: Yup.string().nullable(false),
      number: Yup.number().nullable(false),
      complement: Yup.string(),
      state: Yup.string()
        .min(2)
        .max(2)
        .nullable(false),
      city: Yup.string().nullable(false),
      zipcode: Yup.string()
        .min(8)
        .max(8)
        .nullable(false),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    let { name } = req.body;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json(`Recipient with id ${id} not found`);
    }

    if (name && name !== recipient.name) {
      const recipientExists = await Recipient.findOne({ where: { name } });

      if (recipientExists) {
        return res
          .status(400)
          .json({ error: 'Recipient already exists with that name' });
      }
    }

    // If the name wasn't sent in the request, get the name from the model to return.
    name = name || recipient.name;

    const {
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    });
  }
}

export default new RecipientController();
