import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
  public_id: string;
  url: string;
}

export interface IReview extends Document {
  user: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
}

export interface ILocation {
  type: string;
  coordinates: number[];
  formattedAddress: string;
  city: string;
  county: string;
  postCode: string;
  country: string;
}

export interface IRoom extends Document {
  name: string;
  description: string;
  pricePerNight: number;
  address: string;
  location: ILocation;
  guestCapacity: number;
  numOfBeds: number;
  isInternet: boolean;
  isBreakfast: boolean;
  isAirConditioned: boolean;
  isPetsAllowed: boolean;
  isRoomCleaning: boolean;
  ratings: number;
  numOfReviews: number;
  images: IImage[];
  category: string;
  reviews: IReview[];
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const roomSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter room name'],
    trim: true,
    maxLength: [200, 'Room name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please enter room description']
  },
  pricePerNight: {
    type: Number,
    required: [true, 'Please enter room price per might'],
    default: 0.0
  },
  address: {
    type: String,
    required: [true, 'Please enter room address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number], //an array of 2 numbers (lat and long)
      index: '2dsphere' //geospatial data
    },
    formattedAddress: String,
    city: String,
    county: String,
    postCode: String,
    country: String
  },
  guestCapacity: {
    type: Number,
    required: [true, 'Please enter room guest capacity']
  },
  numOfBeds: {
    type: Number,
    required: [true, 'Please enter number of beds in the room']
  },
  internet: {
    type: Boolean,
    default: false
  },
  isBreakfast: {
    type: Boolean,
    default: false
  },
  isAirConditioned: {
    type: Boolean,
    default: false
  },
  isPetsAllowed: {
    type: Boolean,
    default: false
  },
  isRoomCleaning: {
    type: Boolean,
    default: false
  },
  ratings: {
    type: Number,
    default: 0
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    required: [true, 'Please enter room category'],
    enum: {
      values: ['King', 'Single', 'Twins'],
      message: 'Please select correct category for the room'
    }
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Room ||
  mongoose.model<IRoom>('Room', roomSchema);
