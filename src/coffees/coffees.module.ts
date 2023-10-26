import { Module } from '@nestjs/common';
import { PrismaExceptionHandler } from '../../src/prisma/exceptions/exception-handler';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService, PrismaService, PrismaExceptionHandler],
})
export class CoffeesModule {}
