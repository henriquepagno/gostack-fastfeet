import Mail from '../../lib/Mail';

class DeliveryConfirmationMail {
  get key() {
    return 'DeliveryConfirmationMail';
  }

  async handle({ data }) {
    const { delivery, recipient, deliveryman } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      suject: 'Delivery ready to withdrawal',
      template: 'deliveryConfirmation',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        product: delivery.product,
      },
    });
  }
}

export default new DeliveryConfirmationMail();
