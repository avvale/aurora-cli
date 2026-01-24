import {
  CommonPaginateCountriesController,
  CommonPaginateCountriesHandler,
} from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateCountriesController', () => {
  let controller: CommonPaginateCountriesController;
  let handler: CommonPaginateCountriesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [CommonPaginateCountriesController],
      providers: [
        {
          provide: CommonPaginateCountriesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonPaginateCountriesController>(
      CommonPaginateCountriesController,
    );
    handler = module.get<CommonPaginateCountriesHandler>(
      CommonPaginateCountriesHandler,
    );
  });

  describe('main', () => {
    test('CommonPaginateCountriesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a commonMockCountryData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: commonMockCountryData,
            }),
          ),
      );
      expect(await controller.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: commonMockCountryData,
      });
    });
  });
});
