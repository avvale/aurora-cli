import {
  CommonGetResourcesController,
  CommonGetResourcesHandler,
} from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetResourcesController', () => {
  let controller: CommonGetResourcesController;
  let handler: CommonGetResourcesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonGetResourcesController],
      providers: [
        {
          provide: CommonGetResourcesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonGetResourcesController>(
      CommonGetResourcesController,
    );
    handler = module.get<CommonGetResourcesHandler>(CommonGetResourcesHandler);
  });

  describe('main', () => {
    test('CommonGetResourcesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a commonMockResourceData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockResourceData)),
        );
      expect(await controller.main()).toBe(commonMockResourceData);
    });
  });
});
