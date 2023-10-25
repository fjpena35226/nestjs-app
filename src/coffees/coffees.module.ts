import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import coffeesConfig from './config/coffees.config';
import { Coffee } from './entities/coffee.entity';
import { Event } from './entities/event.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule,
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService, ConfigService],
  exports: [CoffeesService],
})
export class CoffeesModule {}
