import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import {
  MockContext,
  Context,
  createMockContext,
} from '../prisma/mocked-context';
import { PrismaService } from '../../src/prisma/prisma.service';
import { PrismaExceptionHandler } from '../../src/prisma/exceptions/exception-handler';
import { PrismaRequiredRecordNotFoundError } from '../../src/prisma/exceptions/not-found';

describe('CoffeesService', () => {
  let service: CoffeesService;
  let mockCtx: MockContext;
  let ctx: Context;

  const expectedCoffee = {
    id: 1,
    name: 'espresso',
    brand: 'coffee',
  };

  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        {
          provide: PrismaService,
          useValue: ctx.prisma,
        },
        {
          provide: PrismaExceptionHandler,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return coffee object', async () => {
        const coffeeId = 1;
        mockCtx.prisma.coffee.findFirst.mockResolvedValue(expectedCoffee);

        await expect(service.findOne(coffeeId)).resolves.toEqual(
          expectedCoffee,
        );
      });
    });

    describe('otherwise', () => {
      it('should throw "NotFoundException"', async () => {
        const coffeeId = 1;
        const errorMessage = `Coffee ${coffeeId} not found`;
        mockCtx.prisma.coffee.findFirst.mockRejectedValue(
          new PrismaRequiredRecordNotFoundError(errorMessage),
        );

        try {
          await service.findOne(coffeeId);
          expect(false).toBeTruthy();
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaRequiredRecordNotFoundError);
          expect(err.message).toEqual(errorMessage);
        }
      });
    });
  });
});
