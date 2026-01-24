import {
  ToolsCreateMigrationController,
  ToolsCreateMigrationHandler,
} from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateMigrationController', () => {
  let controller: ToolsCreateMigrationController;
  let handler: ToolsCreateMigrationHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsCreateMigrationController],
      providers: [
        {
          provide: ToolsCreateMigrationHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsCreateMigrationController>(
      ToolsCreateMigrationController,
    );
    handler = module.get<ToolsCreateMigrationHandler>(
      ToolsCreateMigrationHandler,
    );
  });

  describe('main', () => {
    test('ToolsCreateMigrationController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an migration created', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockMigrationData[0])),
        );
      expect(await controller.main(toolsMockMigrationData[0])).toBe(
        toolsMockMigrationData[0],
      );
    });
  });
});
