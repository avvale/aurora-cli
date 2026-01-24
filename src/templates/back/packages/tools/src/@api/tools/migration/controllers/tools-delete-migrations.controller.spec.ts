import {
  ToolsDeleteMigrationsController,
  ToolsDeleteMigrationsHandler,
} from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteMigrationsController', () => {
  let controller: ToolsDeleteMigrationsController;
  let handler: ToolsDeleteMigrationsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsDeleteMigrationsController],
      providers: [
        {
          provide: ToolsDeleteMigrationsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsDeleteMigrationsController>(
      ToolsDeleteMigrationsController,
    );
    handler = module.get<ToolsDeleteMigrationsHandler>(
      ToolsDeleteMigrationsHandler,
    );
  });

  describe('main', () => {
    test('ToolsDeleteMigrationsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an toolsMockMigrationData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockMigrationData)),
        );
      expect(await controller.main()).toBe(toolsMockMigrationData);
    });
  });
});
