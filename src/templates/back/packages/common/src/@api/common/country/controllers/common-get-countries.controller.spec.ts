import {
  CommonGetCountriesController,
  CommonGetCountriesHandler,
} from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetCountriesController', () => {
  let controller: CommonGetCountriesController;
  let handler: CommonGetCountriesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [CommonGetCountriesController],
      providers: [
        {
          provide: CommonGetCountriesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonGetCountriesController>(
      CommonGetCountriesController,
    );
    handler = module.get<CommonGetCountriesHandler>(CommonGetCountriesHandler);
  });

  describe('main', () => {
    test('CommonGetCountriesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a commonMockCountryData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockCountryData)),
        );
      expect(await controller.main()).toBe(commonMockCountryData);
    });
  });
});
