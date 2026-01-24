/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonPaginateAdministrativeAreasLevel3Handler,
  CommonPaginateAdministrativeAreasLevel3Resolver,
} from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAdministrativeAreasLevel3Resolver', () => {
  let resolver: CommonPaginateAdministrativeAreasLevel3Resolver;
  let handler: CommonPaginateAdministrativeAreasLevel3Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonPaginateAdministrativeAreasLevel3Resolver,
        {
          provide: CommonPaginateAdministrativeAreasLevel3Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonPaginateAdministrativeAreasLevel3Resolver>(
      CommonPaginateAdministrativeAreasLevel3Resolver,
    );
    handler = module.get<CommonPaginateAdministrativeAreasLevel3Handler>(
      CommonPaginateAdministrativeAreasLevel3Handler,
    );
  });

  test('CommonPaginateAdministrativeAreasLevel3Resolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonPaginateAdministrativeAreasLevel3Resolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a commonMockAdministrativeAreaLevel3Data', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: commonMockAdministrativeAreaLevel3Data,
            }),
          ),
      );
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: commonMockAdministrativeAreaLevel3Data,
      });
    });
  });
});
