import {
  CommonPaginateLangsController,
  CommonPaginateLangsHandler,
} from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateLangsController', () => {
  let controller: CommonPaginateLangsController;
  let handler: CommonPaginateLangsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonPaginateLangsController],
      providers: [
        {
          provide: CommonPaginateLangsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonPaginateLangsController>(
      CommonPaginateLangsController,
    );
    handler = module.get<CommonPaginateLangsHandler>(
      CommonPaginateLangsHandler,
    );
  });

  describe('main', () => {
    test('CommonPaginateLangsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a commonMockLangData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: commonMockLangData,
            }),
          ),
      );
      expect(await controller.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: commonMockLangData,
      });
    });
  });
});
