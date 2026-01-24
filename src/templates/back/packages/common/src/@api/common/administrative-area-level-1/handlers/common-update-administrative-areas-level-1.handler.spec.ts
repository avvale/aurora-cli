/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateAdministrativeAreasLevel1Handler } from '@api/common/administrative-area-level-1';
import { CommonUpdateAdministrativeAreasLevel1Input } from '@api/graphql';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreasLevel1Handler', () => {
  let handler: CommonUpdateAdministrativeAreasLevel1Handler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonUpdateAdministrativeAreasLevel1Handler,
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

    handler = module.get<CommonUpdateAdministrativeAreasLevel1Handler>(
      CommonUpdateAdministrativeAreasLevel1Handler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonUpdateAdministrativeAreasLevel1Handler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonUpdateAdministrativeAreasLevel1Handler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a administrativeAreasLevel1 updated', async () => {
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
          <CommonUpdateAdministrativeAreasLevel1Input>(
            commonMockAdministrativeAreaLevel1Data[0]
          ),
          {},
          {},
          'Europe/Madrid',
        ),
      ).toBe(commonMockAdministrativeAreaLevel1Data[0]);
    });
  });
});
