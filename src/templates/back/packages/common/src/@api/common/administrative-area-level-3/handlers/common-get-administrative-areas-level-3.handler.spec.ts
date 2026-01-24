/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonGetAdministrativeAreasLevel3Handler } from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAdministrativeAreasLevel3Handler', () => {
  let handler: CommonGetAdministrativeAreasLevel3Handler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonGetAdministrativeAreasLevel3Handler,
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

    handler = module.get<CommonGetAdministrativeAreasLevel3Handler>(
      CommonGetAdministrativeAreasLevel3Handler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonGetAdministrativeAreasLevel3Handler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonGetAdministrativeAreasLevel3Handler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a commonMockAdministrativeAreaLevel3Data', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel3Data),
            ),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        commonMockAdministrativeAreaLevel3Data,
      );
    });
  });
});
