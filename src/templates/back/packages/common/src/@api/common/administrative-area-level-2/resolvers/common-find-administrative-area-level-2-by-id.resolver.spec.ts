/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonFindAdministrativeAreaLevel2ByIdHandler,
  CommonFindAdministrativeAreaLevel2ByIdResolver,
} from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel2ByIdResolver', () => {
  let resolver: CommonFindAdministrativeAreaLevel2ByIdResolver;
  let handler: CommonFindAdministrativeAreaLevel2ByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindAdministrativeAreaLevel2ByIdResolver,
        {
          provide: CommonFindAdministrativeAreaLevel2ByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonFindAdministrativeAreaLevel2ByIdResolver>(
      CommonFindAdministrativeAreaLevel2ByIdResolver,
    );
    handler = module.get<CommonFindAdministrativeAreaLevel2ByIdHandler>(
      CommonFindAdministrativeAreaLevel2ByIdHandler,
    );
  });

  test('CommonFindAdministrativeAreaLevel2ByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel2ByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an administrativeAreaLevel2 by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel2Data[0]),
            ),
        );
      expect(
        await resolver.main(commonMockAdministrativeAreaLevel2Data[0].id),
      ).toBe(commonMockAdministrativeAreaLevel2Data[0]);
    });
  });
});
