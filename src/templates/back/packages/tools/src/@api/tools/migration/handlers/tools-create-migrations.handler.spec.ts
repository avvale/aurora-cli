import { ToolsCreateMigrationsHandler } from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateMigrationsHandler', () => {
  let handler: ToolsCreateMigrationsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsCreateMigrationsHandler,
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

    handler = module.get<ToolsCreateMigrationsHandler>(
      ToolsCreateMigrationsHandler,
    );
  });

  describe('main', () => {
    test('ToolsCreateMigrationsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an toolsMockMigrationData created', async () => {
      expect(await handler.main(toolsMockMigrationData)).toBe(true);
    });
  });
});
