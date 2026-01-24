import { CommonCreateCountriesHandler } from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateCountriesHandler', () => {
  let handler: CommonCreateCountriesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateCountriesHandler,
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<CommonCreateCountriesHandler>(
      CommonCreateCountriesHandler,
    );
  });

  describe('main', () => {
    test('CommonCreateCountriesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an commonMockCountryData created', async () => {
      expect(await handler.main(commonMockCountryData)).toBe(true);
    });
  });
});
