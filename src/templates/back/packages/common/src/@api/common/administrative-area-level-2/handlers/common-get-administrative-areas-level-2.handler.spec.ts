/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonGetAdministrativeAreasLevel2Handler } from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAdministrativeAreasLevel2Handler', () => {
  let handler: CommonGetAdministrativeAreasLevel2Handler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonGetAdministrativeAreasLevel2Handler,
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

    handler = module.get<CommonGetAdministrativeAreasLevel2Handler>(
      CommonGetAdministrativeAreasLevel2Handler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonGetAdministrativeAreasLevel2Handler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonGetAdministrativeAreasLevel2Handler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a commonMockAdministrativeAreaLevel2Data', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel2Data),
            ),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        commonMockAdministrativeAreaLevel2Data,
      );
    });
  });
});
