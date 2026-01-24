import {
  ToolsUpdateMigrationByIdController,
  ToolsUpdateMigrationByIdHandler,
} from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateMigrationByIdController', () => {
  let controller: ToolsUpdateMigrationByIdController;
  let handler: ToolsUpdateMigrationByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsUpdateMigrationByIdController],
      providers: [
        {
          provide: ToolsUpdateMigrationByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsUpdateMigrationByIdController>(
      ToolsUpdateMigrationByIdController,
    );
    handler = module.get<ToolsUpdateMigrationByIdHandler>(
      ToolsUpdateMigrationByIdHandler,
    );
  });

  describe('main', () => {
    test('ToolsUpdateMigrationByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a migration updated', async () => {
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
