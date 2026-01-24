/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsDeleteProceduresHandler } from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteProceduresHandler', () => {
  let handler: ToolsDeleteProceduresHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsDeleteProceduresHandler,
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

    handler = module.get<ToolsDeleteProceduresHandler>(
      ToolsDeleteProceduresHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('ToolsDeleteProceduresHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('ToolsDeleteProceduresHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an toolsMockProcedureData deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockProcedureData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        toolsMockProcedureData,
      );
    });
  });
});
