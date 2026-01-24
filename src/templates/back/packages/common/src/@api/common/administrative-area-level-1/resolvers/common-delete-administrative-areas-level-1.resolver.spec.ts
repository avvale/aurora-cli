/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonDeleteAdministrativeAreasLevel1Handler,
  CommonDeleteAdministrativeAreasLevel1Resolver,
} from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreasLevel1Resolver', () => {
  let resolver: CommonDeleteAdministrativeAreasLevel1Resolver;
  let handler: CommonDeleteAdministrativeAreasLevel1Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonDeleteAdministrativeAreasLevel1Resolver,
        {
          provide: CommonDeleteAdministrativeAreasLevel1Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonDeleteAdministrativeAreasLevel1Resolver>(
      CommonDeleteAdministrativeAreasLevel1Resolver,
    );
    handler = module.get<CommonDeleteAdministrativeAreasLevel1Handler>(
      CommonDeleteAdministrativeAreasLevel1Handler,
    );
  });

  test('CommonDeleteAdministrativeAreasLevel1Resolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonDeleteAdministrativeAreasLevel1Resolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an commonMockAdministrativeAreaLevel1Data deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel1Data),
            ),
        );
      expect(await resolver.main()).toBe(
        commonMockAdministrativeAreaLevel1Data,
      );
    });
  });
});
