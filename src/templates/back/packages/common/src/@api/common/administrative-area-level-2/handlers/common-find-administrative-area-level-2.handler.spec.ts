/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindAdministrativeAreaLevel2Handler } from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel2Handler', () => {
  let handler: CommonFindAdministrativeAreaLevel2Handler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindAdministrativeAreaLevel2Handler,
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

    handler = module.get<CommonFindAdministrativeAreaLevel2Handler>(
      CommonFindAdministrativeAreaLevel2Handler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonFindAdministrativeAreaLevel2Handler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel2Handler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a administrativeAreaLevel2', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel2Data[0]),
            ),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        commonMockAdministrativeAreaLevel2Data[0],
      );
    });
  });
});
