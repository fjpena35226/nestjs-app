import { Injectable } from '@nestjs/common';
import { Flavor } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({ limit, offset }: PaginationQueryDto) {
    return await this.prismaService.coffee.findMany({
      take: limit,
      skip: offset,
      include: {
        flavors: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.coffee.findFirst({
      where: { id: +id },
      include: {
        flavors: true,
      },
    });
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((flavor) => this.preloadFlavorByName(flavor)),
    );

    return await this.prismaService.coffee.create({
      data: {
        ...createCoffeeDto,
        flavors: {
          connect: flavors.map(({ id }) => ({ id })),
        },
      },
      include: {
        flavors: true,
      },
    });
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = await Promise.all(
      updateCoffeeDto.flavors.map((flavor) => this.preloadFlavorByName(flavor)),
    );

    return await this.prismaService.coffee.update({
      where: { id: id },
      data: {
        ...updateCoffeeDto,
        flavors: {
          set: [],
          connect: flavors.map(({ id }) => ({ id })),
        },
      },
      include: {
        flavors: true,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.coffee.delete({
      where: { id },
      include: {
        flavors: true,
      },
    });
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.prismaService.flavor.findFirst({
      where: { name },
    });
    if (existingFlavor) return existingFlavor;

    return await this.prismaService.flavor.create({ data: { name } });
  }
}
