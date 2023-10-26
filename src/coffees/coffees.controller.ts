import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from '../../src/common/dto/pagination-query.dto';
import { PrismaRequiredRecordNotFoundError } from '../../src/prisma/exceptions/not-found';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeeService.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const coffee = await this.coffeeService.findOne(id);
    if (!coffee) throw new NotFoundException(`Coffee #${id} not found`);
    return coffee;
  }

  @Post()
  async create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return await this.coffeeService.create(createCoffeeDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    try {
      const coffee = await this.coffeeService.update(id, updateCoffeeDto);
      if (!coffee) throw new NotFoundException(`Coffee #${id} not found`);
      return coffee;
    } catch (err) {
      if (err instanceof PrismaRequiredRecordNotFoundError)
        throw new NotFoundException(`Coffee #${id} not found`);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const coffee = await this.coffeeService.remove(id);
      if (!coffee) throw new NotFoundException(`Coffee #${id} not found`);
      return coffee;
    } catch (err) {
      if (err instanceof PrismaRequiredRecordNotFoundError)
        throw new NotFoundException(`Coffee #${id} not found`);
    }
  }
}
