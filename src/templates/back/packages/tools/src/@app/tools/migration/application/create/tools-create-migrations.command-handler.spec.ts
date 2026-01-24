import {
  ToolsCreateMigrationsCommand,
  toolsMockMigrationData,
} from '@app/tools/migration';
import { ToolsCreateMigrationsCommandHandler } from '@app/tools/migration/application/create/tools-create-migrations.command-handler';
import { ToolsCreateMigrationsService } from '@app/tools/migration/application/create/tools-create-migrations.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('toolsCreateMigrationsCommandHandler', () => {
  let commandHandler: ToolsCreateMigrationsCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsCreateMigrationsCommandHandler,
        {
          provide: ToolsCreateMigrationsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<ToolsCreateMigrationsCommandHandler>(
      ToolsCreateMigrationsCommandHandler,
    );
  });

  describe('main', () => {
    test('ToolsCreateMigrationsCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return ToolsMockMigrationData created', async () => {
      expect(
        await commandHandler.execute(
          new ToolsCreateMigrationsCommand(toolsMockMigrationData, {
            timezone: process.env.TZ,
          }),
        ),
      ).toBe(undefined);
    });
  });
});
