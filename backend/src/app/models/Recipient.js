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
        formatted_zipcode: {
          type: Sequelize.VIRTUAL(Sequelize.STRING, ['zipcode']),
          get() {
            const zipcode = this.get('zipcode');
            const regex = /([0-9]{5})([0-9]{3})/gm;
            return zipcode.replace(regex, '$1-$2');
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Recipient;
