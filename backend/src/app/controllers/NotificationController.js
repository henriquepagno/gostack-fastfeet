import Notification from '../schemas/Notification';
import Deliveryman from '../models/Deliveryman';

class NotificationController {
  async index(req, res) {
    // Check if deliveryman sent exists
    const deliveryman = await Deliveryman.findOne({
      where: {
        id: req.params.deliverymanId,
      },
    });

    if (!deliveryman) {
      return res.status(401).json({
        error: `Deliveryman with id ${req.params.deliverymanId} not found.`,
      });
    }

    const notifications = await Notification.find({
      deliveryman: req.params.deliverymanId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true,
      },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
