/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsDeleteProcedureByIdHandler } from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteProcedureByIdController', () => {
  let handler: ToolsDeleteProcedureByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsDeleteProcedureByIdHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<ToolsDeleteProcedureByIdHandler>(
      ToolsDeleteProcedureByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('ToolsDeleteProcedureByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an procedure deleted', async () => {
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
