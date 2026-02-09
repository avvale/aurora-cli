/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CommonFindAdministrativeAreaLevel1Handler } from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel1Handler', () => {
  let handler: CommonFindAdministrativeAreaLevel1Handler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindAdministrativeAreaLevel1Handler,
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

    handler = module.get<CommonFindAdministrativeAreaLevel1Handler>(
      CommonFindAdministrativeAreaLevel1Handler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonFindAdministrativeAreaLevel1Handler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel1Handler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a administrativeAreaLevel1', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel1Data[0]),
            ),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        commonMockAdministrativeAreaLevel1Data[0],
      );
    });
  });
});
