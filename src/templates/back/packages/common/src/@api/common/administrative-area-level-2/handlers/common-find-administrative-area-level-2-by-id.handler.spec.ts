/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CommonFindAdministrativeAreaLevel2ByIdHandler } from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel2ByIdHandler', () => {
  let handler: CommonFindAdministrativeAreaLevel2ByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindAdministrativeAreaLevel2ByIdHandler,
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

    handler = module.get<CommonFindAdministrativeAreaLevel2ByIdHandler>(
      CommonFindAdministrativeAreaLevel2ByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonFindAdministrativeAreaLevel2ByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel2ByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an administrativeAreaLevel2 by id', async () => {
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
