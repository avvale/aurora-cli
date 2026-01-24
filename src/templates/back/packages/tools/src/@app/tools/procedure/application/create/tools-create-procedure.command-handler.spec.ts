import {
  ToolsCreateProcedureCommand,
  toolsMockProcedureData,
} from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';
import { ToolsCreateProcedureCommandHandler } from './tools-create-procedure.command-handler';
import { ToolsCreateProcedureService } from './tools-create-procedure.service';

describe('ToolsCreateProcedureCommandHandler', () => {
  let commandHandler: ToolsCreateProcedureCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsCreateProcedureCommandHandler,
        {
          provide: ToolsCreateProcedureService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<ToolsCreateProcedureCommandHandler>(
      ToolsCreateProcedureCommandHandler,
    );
  });

  describe('main', () => {
    test('CreateProcedureCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the values objects and pass them as parameters to the ToolsCreateProcedureService', async () => {
      expect(
        await commandHandler.execute(
          new ToolsCreateProcedureCommand(
            {
              id: toolsMockProcedureData[0].id,
              rowId: toolsMockProcedureData[0].rowId,
              name: toolsMockProcedureData[0].name,
              type: toolsMockProcedureData[0].type,
              version: toolsMockProcedureData[0].version,
              isActive: toolsMockProcedureData[0].isActive,
              isExecuted: toolsMockProcedureData[0].isExecuted,
              isUpdated: toolsMockProcedureData[0].isUpdated,
              upScript: toolsMockProcedureData[0].upScript,
              downScript: toolsMockProcedureData[0].downScript,
              sort: toolsMockProcedureData[0].sort,
              hash: toolsMockProcedureData[0].hash,
              executedAt: toolsMockProcedureData[0].executedAt,
              checkedAt: toolsMockProcedureData[0].checkedAt,
            },
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
