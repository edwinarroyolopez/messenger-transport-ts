// src/db.ts
import mongoose from 'mongoose';

console.log(process.env.NODE_ENV)
console.log({MONGODB_URI: process.env.MONGODB_URI})

const MONGODB_URI = process.env.MONGODB_URI || ''; // duplicated
const options = Object.assign({ useNewUrlParser: true })  // duplicated

mongoose.connect(MONGODB_URI, options );
const connLocal = mongoose.createConnection(MONGODB_URI, options);

export  {
  connLocal,
  mongoose
}

