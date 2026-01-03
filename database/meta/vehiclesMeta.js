import { metaTypes } from './metaTypes';

export const vehiclesMeta = {
  id: metaTypes.INTEGER_PK_AI,
  bodyStyle: metaTypes.TEXT,
  location: metaTypes.TEXT,
  make: metaTypes.TEXT,
  model: metaTypes.TEXT,
  modelYear: metaTypes.INTEGER,
  odometer: metaTypes.INTEGER,
  trim: metaTypes.TEXT,
  vin: metaTypes.TEXT,
  year: metaTypes.INTEGER
};
