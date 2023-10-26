import { Injectable } from '@nestjs/common';
import { Flavor } from '@prisma/client';
import { PaginationQueryDto } from '../../src/common/dto/pagination-query.dto';
import { PrismaExceptionHandler } from '../../src/prisma/exceptions/exception-handler';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly prismaExceptionHandler: PrismaExceptionHandler,
  ) {}

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
    const flavors = createCoffeeDto.flavors
      ? await Promise.all(
          createCoffeeDto.flavors.map((flavor) =>
            this.preloadFlavorByName(flavor),
          ),
        )
      : [];

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
    try {
      const flavors = updateCoffeeDto.flavors
        ? await Promise.all(
            updateCoffeeDto.flavors.map((flavor) =>
              this.preloadFlavorByName(flavor),
            ),
          )
        : (await this.findOne(id)).flavors;

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
    } catch (err) {
      this.prismaExceptionHandler.handle(err);
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.coffee.delete({
        where: { id },
        include: {
          flavors: true,
        },
      });
    } catch (err) {
      this.prismaExceptionHandler.handle(err);
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.prismaService.flavor.findFirst({
      where: { name },
    });
    if (existingFlavor) return existingFlavor;

    return await this.prismaService.flavor.create({ data: { name } });
  }
}
