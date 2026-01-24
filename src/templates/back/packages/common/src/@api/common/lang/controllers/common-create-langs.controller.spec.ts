import {
  CommonCreateLangsController,
  CommonCreateLangsHandler,
} from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateLangsController', () => {
  let controller: CommonCreateLangsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommonCreateLangsController],
      providers: [
        {
          provide: CommonCreateLangsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonCreateLangsController>(
      CommonCreateLangsController,
    );
  });

  describe('main', () => {
    test('CommonCreateLangsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an commonMockLangData created', async () => {
      expect(await controller.main(commonMockLangData)).toBe(undefined);
    });
  });
});
