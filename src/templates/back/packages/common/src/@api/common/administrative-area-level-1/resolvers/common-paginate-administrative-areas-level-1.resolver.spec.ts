/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonPaginateAdministrativeAreasLevel1Handler,
  CommonPaginateAdministrativeAreasLevel1Resolver,
} from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAdministrativeAreasLevel1Resolver', () => {
  let resolver: CommonPaginateAdministrativeAreasLevel1Resolver;
  let handler: CommonPaginateAdministrativeAreasLevel1Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonPaginateAdministrativeAreasLevel1Resolver,
        {
          provide: CommonPaginateAdministrativeAreasLevel1Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonPaginateAdministrativeAreasLevel1Resolver>(
      CommonPaginateAdministrativeAreasLevel1Resolver,
    );
    handler = module.get<CommonPaginateAdministrativeAreasLevel1Handler>(
      CommonPaginateAdministrativeAreasLevel1Handler,
    );
  });

  test('CommonPaginateAdministrativeAreasLevel1Resolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonPaginateAdministrativeAreasLevel1Resolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a commonMockAdministrativeAreaLevel1Data', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: commonMockAdministrativeAreaLevel1Data,
            }),
          ),
      );
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: commonMockAdministrativeAreaLevel1Data,
      });
    });
  });
});
