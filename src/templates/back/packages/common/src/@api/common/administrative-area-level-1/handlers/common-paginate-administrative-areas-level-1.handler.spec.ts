/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonPaginateAdministrativeAreasLevel1Handler } from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAdministrativeAreasLevel1Handler', () => {
  let handler: CommonPaginateAdministrativeAreasLevel1Handler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonPaginateAdministrativeAreasLevel1Handler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<CommonPaginateAdministrativeAreasLevel1Handler>(
      CommonPaginateAdministrativeAreasLevel1Handler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonPaginateAdministrativeAreasLevel1Handler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonPaginateAdministrativeAreasLevel1Handler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a administrativeAreasLevel1', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: commonMockAdministrativeAreaLevel1Data.length,
              count: commonMockAdministrativeAreaLevel1Data.length,
              rows: commonMockAdministrativeAreaLevel1Data,
            }),
          ),
      );
      expect(await handler.main({}, {})).toEqual({
        total: commonMockAdministrativeAreaLevel1Data.length,
        count: commonMockAdministrativeAreaLevel1Data.length,
        rows: commonMockAdministrativeAreaLevel1Data,
      });
    });
  });
});
