import {
  CommonGetLangsController,
  CommonGetLangsHandler,
} from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetLangsController', () => {
  let controller: CommonGetLangsController;
  let handler: CommonGetLangsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonGetLangsController],
      providers: [
        {
          provide: CommonGetLangsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonGetLangsController>(CommonGetLangsController);
    handler = module.get<CommonGetLangsHandler>(CommonGetLangsHandler);
  });

  describe('main', () => {
    test('CommonGetLangsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a commonMockLangData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockLangData)),
        );
      expect(await controller.main()).toBe(commonMockLangData);
    });
  });
});
