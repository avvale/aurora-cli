/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';
import { ToolsRunScriptsProcedureHandler } from './tools-run-scripts-procedure.handler';

describe('ToolsRunScriptsProcedureHandler', () => {
  let handler: ToolsRunScriptsProcedureHandler;
  let queryBus: IQueryBus;
  let commandBus: ICommandBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsRunScriptsProcedureHandler,
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

    handler = module.get<ToolsRunScriptsProcedureHandler>(
      ToolsRunScriptsProcedureHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
    commandBus = module.get<ICommandBus>(ICommandBus);
  });

  describe('main', () => {
    test('ToolsRunScriptsProcedureHandler should be defined', () => {
      expect(handler).toBeDefined();
    });
  });
});
