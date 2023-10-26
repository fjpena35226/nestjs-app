import { BaseError } from './error';

export const PRISMA_REQUIRED_RECORD_NOT_FOUND_ERROR = 'P2025';

export class PrismaRequiredRecordNotFoundError extends BaseError {
  constructor(message: string) {
    super(message, PRISMA_REQUIRED_RECORD_NOT_FOUND_ERROR);
  }
}
