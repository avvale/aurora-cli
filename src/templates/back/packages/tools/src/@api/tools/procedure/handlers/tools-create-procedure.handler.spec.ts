/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsCreateProcedureHandler } from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateProcedureHandler', () => {
  let handler: ToolsCreateProcedureHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsCreateProcedureHandler,
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

    handler = module.get<ToolsCreateProcedureHandler>(
      ToolsCreateProcedureHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('ToolsCreateProcedureHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an procedure created', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockProcedureData[0])),
        );
      expect(
        await handler.main(toolsMockProcedureData[0], 'Europe/Madrid'),
      ).toBe(toolsMockProcedureData[0]);
    });
  });
});
