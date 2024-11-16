import axios from 'axios';

export const getByVin = async vin => axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`);
