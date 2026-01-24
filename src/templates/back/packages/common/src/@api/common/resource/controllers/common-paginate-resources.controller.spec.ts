import {
  CommonPaginateResourcesController,
  CommonPaginateResourcesHandler,
} from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateResourcesController', () => {
  let controller: CommonPaginateResourcesController;
  let handler: CommonPaginateResourcesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonPaginateResourcesController],
      providers: [
        {
          provide: CommonPaginateResourcesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonPaginateResourcesController>(
      CommonPaginateResourcesController,
    );
    handler = module.get<CommonPaginateResourcesHandler>(
      CommonPaginateResourcesHandler,
    );
  });

  describe('main', () => {
    test('CommonPaginateResourcesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a commonMockResourceData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: commonMockResourceData,
            }),
          ),
      );
      expect(await controller.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: commonMockResourceData,
      });
    });
  });
});
