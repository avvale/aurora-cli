/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonFindAdministrativeAreaLevel3ByIdHandler,
  CommonFindAdministrativeAreaLevel3ByIdResolver,
} from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel3ByIdResolver', () => {
  let resolver: CommonFindAdministrativeAreaLevel3ByIdResolver;
  let handler: CommonFindAdministrativeAreaLevel3ByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindAdministrativeAreaLevel3ByIdResolver,
        {
          provide: CommonFindAdministrativeAreaLevel3ByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonFindAdministrativeAreaLevel3ByIdResolver>(
      CommonFindAdministrativeAreaLevel3ByIdResolver,
    );
    handler = module.get<CommonFindAdministrativeAreaLevel3ByIdHandler>(
      CommonFindAdministrativeAreaLevel3ByIdHandler,
    );
  });

  test('CommonFindAdministrativeAreaLevel3ByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel3ByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an administrativeAreaLevel3 by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel3Data[0]),
            ),
        );
      expect(
        await resolver.main(commonMockAdministrativeAreaLevel3Data[0].id),
      ).toBe(commonMockAdministrativeAreaLevel3Data[0]);
    });
  });
});
