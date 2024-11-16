import { openDatabaseAsync } from '../database';
import {convertMetaToString} from '../meta/metaTypes';
import {vehiclesMeta} from '../meta/vehiclesMeta';

let db;
const tableName = 'vehicles';

export const initializeDatabase = async () => {
  db = await openDatabaseAsync();
};

export const getTableSchema = async () => {
  const schema = await db.getAllAsync(`PRAGMA table_info(${tableName})`);
  console.log('Table Schema:', schema);
  return schema;
};

export const dropTable = async () => {
  await db.execAsync(`DROP TABLE IF EXISTS ${tableName}`);
};

const getKeysAndPlaceholders = () => {
  const keys = Object.keys(vehiclesMeta);
  keys.shift();
  const questionMarks = keys.map(() => '?').join(',');
  return { keys, questionMarks };
};

export const createVehiclesTable = async () => {
  await initializeDatabase(); // Ensure DB is initialized
  const metaString = convertMetaToString(vehiclesMeta);
  console.log('metaString:', metaString);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ${tableName} (
      ${metaString}
    );
  `);
  console.log('Vehicles table created');
};

export const insertVehicles = async vehicle => {
  await initializeDatabase(); // Ensure DB is initialized
  const { keys, questionMarks } = getKeysAndPlaceholders();
  const result = await db.runAsync(
    `INSERT INTO ${tableName} (${keys.join(',')}) VALUES (${questionMarks})`,
    keys.map(key => vehicle[key])
  );
  console.log('Vehicle inserted with ID:', result.lastInsertRowId);
};

export const getAllVehicles = async () => {
  await initializeDatabase(); // Ensure DB is initialized
  const vehicles = await db.getAllAsync(`SELECT * FROM ${tableName}`);
  return vehicles;
};

export const updateVehicle = async (id, updatedVehicle) => {
  await initializeDatabase(); // Ensure DB is initialized
  const { keys } = getKeysAndPlaceholders();
  const result = await db.runAsync(
    `UPDATE ${tableName} SET ${keys.join(' = ?, ')} = ? WHERE id = ?`,
    [...keys.map(key => updatedVehicle[key]), id]
  );
  console.log('Vehicle updated with changes:', result.changes);
};

export const deleteVehicle = async id => {
  await initializeDatabase(); // Ensure DB is initialized
  const result = await db.runAsync(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
  console.log('Vehicle deleted with changes:', result.changes);
};

export const getVehicleById = async id => {
  await initializeDatabase(); // Ensure DB is initialized
  const vehicle = await db.getFirstAsync(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
  return vehicle;
};

export const tempData = [
  {
    id: 1,
    ro: 180451,
    make: 'Hyundai',
    model: 'Sonata',
    carColor: 'Grey',
    interiorColor: 'White',
    miles: 400,
    gas: 90.0,
    location: 'Home',
    used: false,
    year: 2024,
    vin: '1FTNE24LXYHA81349',
    currentOwner: 'Customer'
  },
  {
    id: 2,
    ro: 180452,
    make: 'Nissan',
    model: 'Altima',
    carColor: 'White',
    interiorColor: 'White',
    miles: 32,
    gas: 95.0,
    location: 'Back Line',
    used: true,
    year: 2023,
    vin: '3N1BC1CP0CK810808',
    currentOwner: 'Sales'
  }
];
