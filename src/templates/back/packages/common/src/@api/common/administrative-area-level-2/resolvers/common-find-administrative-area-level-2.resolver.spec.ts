/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonFindAdministrativeAreaLevel2Handler,
  CommonFindAdministrativeAreaLevel2Resolver,
} from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel2Resolver', () => {
  let resolver: CommonFindAdministrativeAreaLevel2Resolver;
  let handler: CommonFindAdministrativeAreaLevel2Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindAdministrativeAreaLevel2Resolver,
        {
          provide: CommonFindAdministrativeAreaLevel2Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonFindAdministrativeAreaLevel2Resolver>(
      CommonFindAdministrativeAreaLevel2Resolver,
    );
    handler = module.get<CommonFindAdministrativeAreaLevel2Handler>(
      CommonFindAdministrativeAreaLevel2Handler,
    );
  });

  test('CommonFindAdministrativeAreaLevel2Resolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel2Resolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a administrativeAreaLevel2', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel2Data[0]),
            ),
        );
      expect(await resolver.main()).toBe(
        commonMockAdministrativeAreaLevel2Data[0],
      );
    });
  });
});
