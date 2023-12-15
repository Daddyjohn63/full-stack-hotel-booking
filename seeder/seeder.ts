//require('dotenv').config({path: 'next.config.js'})   //if prefer to use env file
import Room from '../backend/models/room';
import mongoose from 'mongoose';
import { rooms } from './data';

const seedRooms = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/bookit-v1');

    await Room.deleteMany();
    console.log('Rooms are deleted');

    await Room.insertMany(rooms);
    console.log('Rooms are inserted');

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();
