import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        state: Sequelize.STRING(2),
        city: Sequelize.STRING,
        zipcode: Sequelize.STRING(8),
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Recipient;
