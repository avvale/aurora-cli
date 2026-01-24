import { ToolsDeleteProceduresCommand } from '@app/tools/procedure';
import { ToolsDeleteProceduresCommandHandler } from '@app/tools/procedure/application/delete/tools-delete-procedures.command-handler';
import { ToolsDeleteProceduresService } from '@app/tools/procedure/application/delete/tools-delete-procedures.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteProceduresCommandHandler', () => {
  let commandHandler: ToolsDeleteProceduresCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsDeleteProceduresCommandHandler,
        {
          provide: ToolsDeleteProceduresService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<ToolsDeleteProceduresCommandHandler>(
      ToolsDeleteProceduresCommandHandler,
    );
  });

  describe('main', () => {
    test('ToolsDeleteProceduresCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return void', async () => {
      expect(
        await commandHandler.execute(new ToolsDeleteProceduresCommand()),
      ).toBe(undefined);
    });
  });
});
