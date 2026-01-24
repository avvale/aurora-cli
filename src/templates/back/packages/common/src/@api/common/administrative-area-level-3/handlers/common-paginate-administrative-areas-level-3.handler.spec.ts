/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonPaginateAdministrativeAreasLevel3Handler } from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAdministrativeAreasLevel3Handler', () => {
  let handler: CommonPaginateAdministrativeAreasLevel3Handler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonPaginateAdministrativeAreasLevel3Handler,
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

    handler = module.get<CommonPaginateAdministrativeAreasLevel3Handler>(
      CommonPaginateAdministrativeAreasLevel3Handler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonPaginateAdministrativeAreasLevel3Handler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonPaginateAdministrativeAreasLevel3Handler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a administrativeAreasLevel3', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: commonMockAdministrativeAreaLevel3Data.length,
              count: commonMockAdministrativeAreaLevel3Data.length,
              rows: commonMockAdministrativeAreaLevel3Data,
            }),
          ),
      );
      expect(await handler.main({}, {})).toEqual({
        total: commonMockAdministrativeAreaLevel3Data.length,
        count: commonMockAdministrativeAreaLevel3Data.length,
        rows: commonMockAdministrativeAreaLevel3Data,
      });
    });
  });
});
