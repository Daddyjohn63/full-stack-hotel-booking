import { NextRequest, NextResponse } from 'next/server';
import Room, { IRoom } from '../models/room';
import ErrorHandler from '../utils/errorHandler';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import APIFilters from '../utils/apiFilters';

//get all rooms => /api/rooms
export const allRooms = catchAsyncErrors(async (req: NextRequest) => {
  const resPerPage: number = 4;

  const { searchParams } = new URL(req.url);

  //throw new ErrorHandler('Hello', 400);

  //console.log(searchParams);

  const queryStr: any = {};

  //produce a query string that we can send to our filter using bracket notation as the key will be dynamic.
  //doing it this way means we can break out multiple query strings.
  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  });
  //console.log(queryStr);

  const roomsCount: number = await Room.countDocuments();

  const apiFilters = new APIFilters(Room, queryStr).search().filter(); //pass in the Room model and the query string

  //now return the query from the class and pass into the object below.
  let rooms: IRoom[] = await apiFilters.query; //this calls this.query in the class.

  const filteredRoomsCount: number = rooms.length;

  apiFilters.pagination(resPerPage);
  rooms = await apiFilters.query.clone(); //clone() is a mongoose method.
  // The clone() method creates a new instance of the query with the same conditions and settings as the original, but without the modifications that might be added later. This allows for reusing the base query safely.
  return NextResponse.json({
    success: true,
    roomsCount,
    filteredRoomsCount,
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
