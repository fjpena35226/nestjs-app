import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  PrismaRequiredRecordNotFoundError,
  PRISMA_REQUIRED_RECORD_NOT_FOUND_ERROR,
} from './not-found';

@Injectable()
export class PrismaExceptionHandler {
  handle(error: object) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === PRISMA_REQUIRED_RECORD_NOT_FOUND_ERROR) {
        throw new PrismaRequiredRecordNotFoundError(error.message);
      }
    }
  }
}
