/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonGetAdministrativeAreasLevel2Handler,
  CommonGetAdministrativeAreasLevel2Resolver,
} from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAdministrativeAreasLevel2Resolver', () => {
  let resolver: CommonGetAdministrativeAreasLevel2Resolver;
  let handler: CommonGetAdministrativeAreasLevel2Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonGetAdministrativeAreasLevel2Resolver,
        {
          provide: CommonGetAdministrativeAreasLevel2Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonGetAdministrativeAreasLevel2Resolver>(
      CommonGetAdministrativeAreasLevel2Resolver,
    );
    handler = module.get<CommonGetAdministrativeAreasLevel2Handler>(
      CommonGetAdministrativeAreasLevel2Handler,
    );
  });

  test('CommonGetAdministrativeAreasLevel2Resolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonGetAdministrativeAreasLevel2Resolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a commonMockAdministrativeAreaLevel2Data', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel2Data),
            ),
        );
      expect(await resolver.main()).toBe(
        commonMockAdministrativeAreaLevel2Data,
      );
    });
  });
});
