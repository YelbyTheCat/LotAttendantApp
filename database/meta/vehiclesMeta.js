import { metaTypes } from './metaTypes';

export const vehiclesMeta = {
  id: metaTypes.INTEGER_PK_AI,
  ro: metaTypes.INTEGER,
  make: metaTypes.TEXT,
  model: metaTypes.TEXT,
  carColor: metaTypes.TEXT,
  interiorColor: metaTypes.TEXT,
  miles: metaTypes.INTEGER,
  gas: metaTypes.REAL,
  location: metaTypes.TEXT,
  used: metaTypes.BOOLEAN,
  year: metaTypes.INTEGER,
  vin: metaTypes.TEXT,
  currentOwner: metaTypes.TEXT,
  trim: metaTypes.TEXT,
  stockNumber: metaTypes.TEXT
};
