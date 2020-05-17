import File from '../models/File';
import Deliveryman from '../models/Deliveryman';

class AvatarController {
  async store(req, res) {
    const { deliverymanId } = req.params;
    const { originalname: name, filename: path } = req.file;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      return res
        .status(400)
        .json({ error: `Deliveryman with id ${deliverymanId} not found.` });
    }

    const file = await File.create({
      name,
      path,
    });

    await deliveryman.update({ avatar_id: file.id });

    return res.json(file);
  }
}

export default new AvatarController();
