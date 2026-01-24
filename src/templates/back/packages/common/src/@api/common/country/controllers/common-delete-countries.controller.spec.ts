import {
  CommonDeleteCountriesController,
  CommonDeleteCountriesHandler,
} from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteCountriesController', () => {
  let controller: CommonDeleteCountriesController;
  let handler: CommonDeleteCountriesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [CommonDeleteCountriesController],
      providers: [
        {
          provide: CommonDeleteCountriesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonDeleteCountriesController>(
      CommonDeleteCountriesController,
    );
    handler = module.get<CommonDeleteCountriesHandler>(
      CommonDeleteCountriesHandler,
    );
  });

  describe('main', () => {
    test('CommonDeleteCountriesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an commonMockCountryData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockCountryData)),
        );
      expect(await controller.main()).toBe(commonMockCountryData);
    });
  });
});
