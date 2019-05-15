import map from 'lodash/map';
import { sequelize } from '../api/models';
const models = sequelize.models;

export default async function truncate() {
  return await Promise.all(
    map(Object.keys(models), model => {
      if (['sequelize', 'Sequelize'].includes(model)) return null;
      return models[model].destroy({ where: {}, force: true });
    })
  );
}