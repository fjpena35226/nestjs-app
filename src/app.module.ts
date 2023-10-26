import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CoffeesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
