import * as dotenv from 'dotenv';
import * as path from 'path';

const environment = process.env.NODE_ENV || 'development';
console.log({ environment })
const srcDir = path.resolve(__dirname, '..', '');

console.log(srcDir)
dotenv.config({ path: `${srcDir}/.env.${environment}` });

