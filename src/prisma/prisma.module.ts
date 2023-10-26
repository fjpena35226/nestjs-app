import { Module } from '@nestjs/common';
import { PrismaExceptionHandler } from './exceptions/exception-handler';
import { PrismaService } from './prisma.service';

@Module({
  exports: [PrismaService, PrismaExceptionHandler],
  providers: [PrismaService, PrismaExceptionHandler],
})
export class PrismaModule {}
