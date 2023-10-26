import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    CoffeesModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.required(),
      }),
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
