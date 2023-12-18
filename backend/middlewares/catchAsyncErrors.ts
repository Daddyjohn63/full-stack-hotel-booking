import { log } from 'console';
import { NextRequest, NextResponse } from 'next/server';

type HandlerFunction = (req: NextRequest, params: any) => Promise<NextResponse>;

interface IValidationError {
  message: string;
}

export const catchAsyncErrors =
  (handler: HandlerFunction) => async (req: NextRequest, params: any) => {
    // console.log('Request:', req); // Logs the request object
    //console.log('Params:', params); // Logs the params object
    try {
      return await handler(req, params); //handler is the route handler we have on roomContollers.ts
    } catch (error: any) {
      // console.log(error);
      //catch / validate mongoose errors
      if (error?.name === 'CastError') {
        error.message = `Resource not found. Invalid ${error?.path}`;
        error.statusCode = 400;
      }
      if (error?.name === 'ValidationError') {
        error.message = Object.values<IValidationError>(error.errors).map(
          value => value.message
        );
        error.statusCode = 400;
      }

      return NextResponse.json(
        {
          message: error.message
        },
        { status: error.statusCode || 500 }
      );
    }
  };
