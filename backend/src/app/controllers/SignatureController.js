import File from '../models/File';
import Delivery from '../models/Delivery';

class SignatureController {
  async store(req, res) {
    const { deliveryId } = req.params;
    const { originalname: name, filename: path } = req.file;

    const delivery = await Delivery.findByPk(deliveryId);

    if (!delivery) {
      return res
        .status(400)
        .json({ error: `Delivery with id ${deliveryId} not found.` });
    }

    const file = await File.create({
      name,
      path,
    });

    await delivery.update({ signature_id: file.id });

    return res.json(file);
  }
}

export default new SignatureController();
