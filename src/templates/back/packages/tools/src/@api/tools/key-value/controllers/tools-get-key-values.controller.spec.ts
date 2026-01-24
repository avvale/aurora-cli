import {
  ToolsGetKeyValuesController,
  ToolsGetKeyValuesHandler,
} from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetKeyValuesController', () => {
  let controller: ToolsGetKeyValuesController;
  let handler: ToolsGetKeyValuesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsGetKeyValuesController],
      providers: [
        {
          provide: ToolsGetKeyValuesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsGetKeyValuesController>(
      ToolsGetKeyValuesController,
    );
    handler = module.get<ToolsGetKeyValuesHandler>(ToolsGetKeyValuesHandler);
  });

  describe('main', () => {
    test('ToolsGetKeyValuesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a toolsMockKeyValueData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockKeyValueData)),
        );
      expect(await controller.main()).toBe(toolsMockKeyValueData);
    });
  });
});
