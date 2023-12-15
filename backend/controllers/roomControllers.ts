import { NextRequest, NextResponse } from 'next/server';
import Room from '../models/room';

//get all rooms => /api/rooms
export const allRooms = async (req: NextRequest) => {
  const resPerPage: number = 8;

  const rooms = await Room.find();

  return NextResponse.json({
    success: true,
    resPerPage,
    rooms
  });
};

//create new room => /api/rooms
export const newRoom = async (req: NextRequest) => {
  const body = await req.json();

  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room
  });
};

//get single room details /api/rooms/:id
export const getRoomDetails = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const room = await Room.findById(params.id);

  if (!room) {
    return NextResponse.json(
      {
        message: 'room not found'
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: 'true',
    room
  });
};

//update room details /api/admin/rooms/:id
export const updateRoom = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  let room = await Room.findById(params.id);
  const body = await req.json();

  if (!room) {
    return NextResponse.json(
      {
        message: 'room not found'
      },
      { status: 404 }
    );
  }

  room = await Room.findByIdAndUpdate(params.id, body, {
    new: true //this will return the updated response/ data in NextResponse below
  });

  return NextResponse.json({
    success: 'true',
    room
  });
};

//Delete a room => /api/admin/rooms/:id

export const deleteRoom = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const room = await Room.findById(params.id);

  if (!room) {
    return NextResponse.json(
      {
        message: 'room not found'
      },
      { status: 404 }
    );
  }

  //TODO = DELETE IMAGES ASSOCIATED WITH THE ROOM

  await room.deleteOne();

  return NextResponse.json({
    success: 'true'
  });
};
