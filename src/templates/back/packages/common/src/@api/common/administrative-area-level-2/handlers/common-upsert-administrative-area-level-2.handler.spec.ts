/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpsertAdministrativeAreaLevel2Handler } from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAdministrativeAreaLevel2Handler', () => {
  let handler: CommonUpsertAdministrativeAreaLevel2Handler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonUpsertAdministrativeAreaLevel2Handler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<CommonUpsertAdministrativeAreaLevel2Handler>(
      CommonUpsertAdministrativeAreaLevel2Handler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('CommonUpsertAdministrativeAreaLevel2Handler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an administrativeAreaLevel2 upserted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel2Data[0]),
            ),
        );
      expect(
        await handler.main(
          commonMockAdministrativeAreaLevel2Data[0],
          'Europe/Madrid',
        ),
      ).toBe(commonMockAdministrativeAreaLevel2Data[0]);
    });
  });
});
