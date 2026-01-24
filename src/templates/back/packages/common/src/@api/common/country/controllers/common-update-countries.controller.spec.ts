import {
  CommonUpdateCountriesController,
  CommonUpdateCountriesHandler,
} from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateCountriesController', () => {
  let controller: CommonUpdateCountriesController;
  let handler: CommonUpdateCountriesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [CommonUpdateCountriesController],
      providers: [
        {
          provide: CommonUpdateCountriesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonUpdateCountriesController>(
      CommonUpdateCountriesController,
    );
    handler = module.get<CommonUpdateCountriesHandler>(
      CommonUpdateCountriesHandler,
    );
  });

  describe('main', () => {
    test('CommonUpdateCountriesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a countries updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockCountryData[0])),
        );
      expect(await controller.main(commonMockCountryData[0])).toBe(
        commonMockCountryData[0],
      );
    });
  });
});
