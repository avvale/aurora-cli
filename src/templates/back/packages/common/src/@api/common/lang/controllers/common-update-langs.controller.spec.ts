import {
  CommonUpdateLangsController,
  CommonUpdateLangsHandler,
} from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateLangsController', () => {
  let controller: CommonUpdateLangsController;
  let handler: CommonUpdateLangsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonUpdateLangsController],
      providers: [
        {
          provide: CommonUpdateLangsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonUpdateLangsController>(
      CommonUpdateLangsController,
    );
    handler = module.get<CommonUpdateLangsHandler>(CommonUpdateLangsHandler);
  });

  describe('main', () => {
    test('CommonUpdateLangsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a langs updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockLangData[0])),
        );
      expect(await controller.main(commonMockLangData[0])).toBe(
        commonMockLangData[0],
      );
    });
  });
});
