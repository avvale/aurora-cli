/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteAdministrativeAreaLevel2ByIdHandler } from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreaLevel2ByIdController', () => {
  let handler: CommonDeleteAdministrativeAreaLevel2ByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonDeleteAdministrativeAreaLevel2ByIdHandler,
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

    handler = module.get<CommonDeleteAdministrativeAreaLevel2ByIdHandler>(
      CommonDeleteAdministrativeAreaLevel2ByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('CommonDeleteAdministrativeAreaLevel2ByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an administrativeAreaLevel2 deleted', async () => {
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
          commonMockAdministrativeAreaLevel2Data[0].id,
          {},
          'Europe/Madrid',
        ),
      ).toBe(commonMockAdministrativeAreaLevel2Data[0]);
    });
  });
});
