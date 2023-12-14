import dbConnect from '@/backend/config/dbConnect';
import { allRooms } from '@/backend/controllers/roomControllers';
import { createEdgeRouter } from 'next-connect';
// import { RequestContext } from 'next/dist/server/base-server'
import { NextRequest } from 'next/server';

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(allRooms);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
