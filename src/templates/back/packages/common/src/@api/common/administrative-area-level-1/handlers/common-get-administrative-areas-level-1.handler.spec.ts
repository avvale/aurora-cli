/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CommonGetAdministrativeAreasLevel1Handler } from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAdministrativeAreasLevel1Handler', () => {
  let handler: CommonGetAdministrativeAreasLevel1Handler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonGetAdministrativeAreasLevel1Handler,
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

    handler = module.get<CommonGetAdministrativeAreasLevel1Handler>(
      CommonGetAdministrativeAreasLevel1Handler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonGetAdministrativeAreasLevel1Handler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonGetAdministrativeAreasLevel1Handler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a commonMockAdministrativeAreaLevel1Data', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel1Data),
            ),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        commonMockAdministrativeAreaLevel1Data,
      );
    });
  });
});
