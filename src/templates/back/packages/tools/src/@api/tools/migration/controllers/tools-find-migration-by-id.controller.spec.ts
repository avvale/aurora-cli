import {
  ToolsFindMigrationByIdController,
  ToolsFindMigrationByIdHandler,
} from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindMigrationByIdController', () => {
  let controller: ToolsFindMigrationByIdController;
  let handler: ToolsFindMigrationByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsFindMigrationByIdController],
      providers: [
        {
          provide: ToolsFindMigrationByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsFindMigrationByIdController>(
      ToolsFindMigrationByIdController,
    );
    handler = module.get<ToolsFindMigrationByIdHandler>(
      ToolsFindMigrationByIdHandler,
    );
  });

  describe('main', () => {
    test('ToolsFindMigrationByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an migration by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockMigrationData[0])),
        );
      expect(await controller.main(toolsMockMigrationData[0].id)).toBe(
        toolsMockMigrationData[0],
      );
    });
  });
});
