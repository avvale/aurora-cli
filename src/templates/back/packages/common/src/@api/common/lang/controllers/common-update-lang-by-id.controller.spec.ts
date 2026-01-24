import {
  CommonUpdateLangByIdController,
  CommonUpdateLangByIdHandler,
} from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateLangByIdController', () => {
  let controller: CommonUpdateLangByIdController;
  let handler: CommonUpdateLangByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonUpdateLangByIdController],
      providers: [
        {
          provide: CommonUpdateLangByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonUpdateLangByIdController>(
      CommonUpdateLangByIdController,
    );
    handler = module.get<CommonUpdateLangByIdHandler>(
      CommonUpdateLangByIdHandler,
    );
  });

  describe('main', () => {
    test('CommonUpdateLangByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a lang updated', async () => {
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
