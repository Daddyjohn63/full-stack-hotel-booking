import { NextRequest, NextResponse } from 'next/server';
import Room from '../models/room';
import ErrorHandler from '../utils/errorHandler';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';

//get all rooms => /api/rooms
export const allRooms = catchAsyncErrors(async (req: NextRequest) => {
  const resPerPage: number = 8;

  const rooms = await Room.find();

  return NextResponse.json({
    success: true,
    resPerPage,
    rooms
  });
});

//create new room => /api/rooms
export const newRoom = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room
  });
});

//get single room details /api/rooms/:id
export const getRoomDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);

    //throw new Error('Hello');
    // throw new ErrorHandler('hello you', 404);

    if (!room) {
      throw new ErrorHandler('Room not found', 404);
    }

    return NextResponse.json({
      success: 'true',
      room
    });
  }
);

//update room details /api/admin/rooms/:id
export const updateRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler('Room not found', 404);
    }

    room = await Room.findByIdAndUpdate(params.id, body, {
      new: true //this will return the updated response/ data in NextResponse below
    });

    return NextResponse.json({
      success: 'true',
      room
    });
  }
);

//Delete a room => /api/admin/rooms/:id

export const deleteRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);

    if (!room) {
      throw new ErrorHandler('Room not found', 404);
    }

    //TODO = DELETE IMAGES ASSOCIATED WITH THE ROOM

    await room.deleteOne();

    return NextResponse.json({
      success: 'true'
    });
  }
);
