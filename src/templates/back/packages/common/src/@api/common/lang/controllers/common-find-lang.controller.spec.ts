/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import {
  CommonFindLangController,
  CommonFindLangHandler,
} from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindLangController', () => {
  let controller: CommonFindLangController;
  let handler: CommonFindLangHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonFindLangController],
      providers: [
        {
          provide: CommonFindLangHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonFindLangController>(CommonFindLangController);
    handler = module.get<CommonFindLangHandler>(CommonFindLangHandler);
  });

  describe('main', () => {
    test('CommonFindLangController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a lang', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockLangData[0])),
        );
      expect(await controller.main()).toBe(commonMockLangData[0]);
    });
  });
});
