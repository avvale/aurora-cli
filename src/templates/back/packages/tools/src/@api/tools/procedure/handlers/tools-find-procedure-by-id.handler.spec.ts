/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsFindProcedureByIdHandler } from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindProcedureByIdHandler', () => {
  let handler: ToolsFindProcedureByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsFindProcedureByIdHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<ToolsFindProcedureByIdHandler>(
      ToolsFindProcedureByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('ToolsFindProcedureByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('ToolsFindProcedureByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an procedure by id', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockProcedureData[0])),
        );
      expect(
        await handler.main(toolsMockProcedureData[0].id, {}, 'Europe/Madrid'),
      ).toBe(toolsMockProcedureData[0]);
    });
  });
});
