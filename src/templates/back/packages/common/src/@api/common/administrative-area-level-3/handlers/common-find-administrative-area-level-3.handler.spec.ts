/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindAdministrativeAreaLevel3Handler } from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel3Handler', () => {
  let handler: CommonFindAdministrativeAreaLevel3Handler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindAdministrativeAreaLevel3Handler,
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

    handler = module.get<CommonFindAdministrativeAreaLevel3Handler>(
      CommonFindAdministrativeAreaLevel3Handler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonFindAdministrativeAreaLevel3Handler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel3Handler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a administrativeAreaLevel3', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel3Data[0]),
            ),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        commonMockAdministrativeAreaLevel3Data[0],
      );
    });
  });
});
