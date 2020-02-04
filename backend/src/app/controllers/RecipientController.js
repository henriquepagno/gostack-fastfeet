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
      name: Yup.string(),
      street: Yup.string().test(
        'oneOfRequired',
        'State, city and zipcode are required fields.',
        function() {
          if (this.parent.street) {
            return this.parent.state && this.parent.city && this.parent.zipcode;
          }
          return true;
        }
      ),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string()
        .min(2)
        .max(2)
        .test(
          'oneOfRequired',
          'Street, city and zipcode are required fields.',
          function() {
            if (this.parent.state) {
              return (
                this.parent.street && this.parent.city && this.parent.zipcode
              );
            }
            return true;
          }
        ),
      city: Yup.string().test(
        'oneOfRequired',
        'Street, state and zipcode are required fields.',
        function() {
          if (this.parent.city) {
            return (
              this.parent.street && this.parent.state && this.parent.zipcode
            );
          }
          return true;
        }
      ),
      zipcode: Yup.string()
        .min(8)
        .max(8)
        .test(
          'oneOfRequired',
          'Street, city and zipcode are required fields.',
          function() {
            if (this.parent.zipcode) {
              return (
                this.parent.street && this.parent.city && this.parent.state
              );
            }
            return true;
          }
        ),
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json(err.errors);
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { name } = req.body;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json(`Recipient with id ${id} not found.`);
    }

    if (name && name !== recipient.name) {
      const recipientExists = await Recipient.findOne({ where: { name } });

      if (recipientExists) {
        return res.status(400).json({ error: 'Recipient already exists' });
      }
    }

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
