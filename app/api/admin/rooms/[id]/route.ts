import dbConnect from '@/backend/config/dbConnect';
import { deleteRoom, updateRoom } from '@/backend/controllers/roomControllers';
import { createEdgeRouter } from 'next-connect';
// import { RequestContext } from 'next/dist/server/base-server'
import { NextRequest } from 'next/server';

//UPDATE A ROOM

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.put(updateRoom);
router.delete(deleteRoom);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}

export async function DELETE(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
