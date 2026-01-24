/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonCreateAdministrativeAreaLevel1Handler } from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreaLevel1Handler', () => {
  let handler: CommonCreateAdministrativeAreaLevel1Handler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonCreateAdministrativeAreaLevel1Handler,
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

    handler = module.get<CommonCreateAdministrativeAreaLevel1Handler>(
      CommonCreateAdministrativeAreaLevel1Handler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('CommonCreateAdministrativeAreaLevel1Handler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an administrativeAreaLevel1 created', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel1Data[0]),
            ),
        );
      expect(
        await handler.main(
          commonMockAdministrativeAreaLevel1Data[0],
          'Europe/Madrid',
        ),
      ).toBe(commonMockAdministrativeAreaLevel1Data[0]);
    });
  });
});
