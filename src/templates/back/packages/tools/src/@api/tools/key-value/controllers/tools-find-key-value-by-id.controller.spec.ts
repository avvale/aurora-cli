import {
  ToolsFindKeyValueByIdController,
  ToolsFindKeyValueByIdHandler,
} from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindKeyValueByIdController', () => {
  let controller: ToolsFindKeyValueByIdController;
  let handler: ToolsFindKeyValueByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsFindKeyValueByIdController],
      providers: [
        {
          provide: ToolsFindKeyValueByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsFindKeyValueByIdController>(
      ToolsFindKeyValueByIdController,
    );
    handler = module.get<ToolsFindKeyValueByIdHandler>(
      ToolsFindKeyValueByIdHandler,
    );
  });

  describe('main', () => {
    test('ToolsFindKeyValueByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an keyValue by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockKeyValueData[0])),
        );
      expect(await controller.main(toolsMockKeyValueData[0].id)).toBe(
        toolsMockKeyValueData[0],
      );
    });
  });
});
