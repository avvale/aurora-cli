import { ToolsDeleteMigrationsCommand } from '@app/tools/migration';
import { ToolsDeleteMigrationsCommandHandler } from '@app/tools/migration/application/delete/tools-delete-migrations.command-handler';
import { ToolsDeleteMigrationsService } from '@app/tools/migration/application/delete/tools-delete-migrations.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteMigrationsCommandHandler', () => {
  let commandHandler: ToolsDeleteMigrationsCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsDeleteMigrationsCommandHandler,
        {
          provide: ToolsDeleteMigrationsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<ToolsDeleteMigrationsCommandHandler>(
      ToolsDeleteMigrationsCommandHandler,
    );
  });

  describe('main', () => {
    test('ToolsDeleteMigrationsCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return void', async () => {
      expect(
        await commandHandler.execute(new ToolsDeleteMigrationsCommand()),
      ).toBe(undefined);
    });
  });
});
