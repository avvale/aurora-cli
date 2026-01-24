/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindAdministrativeAreaLevel1ByIdHandler } from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel1ByIdHandler', () => {
  let handler: CommonFindAdministrativeAreaLevel1ByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindAdministrativeAreaLevel1ByIdHandler,
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

    handler = module.get<CommonFindAdministrativeAreaLevel1ByIdHandler>(
      CommonFindAdministrativeAreaLevel1ByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonFindAdministrativeAreaLevel1ByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel1ByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an administrativeAreaLevel1 by id', async () => {
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
          commonMockAdministrativeAreaLevel1Data[0].id,
          {},
          'Europe/Madrid',
        ),
      ).toBe(commonMockAdministrativeAreaLevel1Data[0]);
    });
  });
});
