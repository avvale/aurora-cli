import {
  ToolsCreateProceduresCommand,
  toolsMockProcedureData,
} from '@app/tools/procedure';
import { ToolsCreateProceduresCommandHandler } from '@app/tools/procedure/application/create/tools-create-procedures.command-handler';
import { ToolsCreateProceduresService } from '@app/tools/procedure/application/create/tools-create-procedures.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('toolsCreateProceduresCommandHandler', () => {
  let commandHandler: ToolsCreateProceduresCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsCreateProceduresCommandHandler,
        {
          provide: ToolsCreateProceduresService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<ToolsCreateProceduresCommandHandler>(
      ToolsCreateProceduresCommandHandler,
    );
  });

  describe('main', () => {
    test('ToolsCreateProceduresCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return ToolsMockProcedureData created', async () => {
      expect(
        await commandHandler.execute(
          new ToolsCreateProceduresCommand(toolsMockProcedureData, {
            timezone: process.env.TZ,
          }),
        ),
      ).toBe(undefined);
    });
  });
});
