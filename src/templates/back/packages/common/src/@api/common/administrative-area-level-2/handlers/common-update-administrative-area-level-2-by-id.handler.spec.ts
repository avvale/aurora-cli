/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CommonUpdateAdministrativeAreaLevel2ByIdHandler } from '@api/common/administrative-area-level-2';
import { CommonUpdateAdministrativeAreaLevel2ByIdInput } from '@api/graphql';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreaLevel2ByIdHandler', () => {
  let handler: CommonUpdateAdministrativeAreaLevel2ByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonUpdateAdministrativeAreaLevel2ByIdHandler,
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

    handler = module.get<CommonUpdateAdministrativeAreaLevel2ByIdHandler>(
      CommonUpdateAdministrativeAreaLevel2ByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonUpdateAdministrativeAreaLevel2ByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonUpdateAdministrativeAreaLevel2ByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a administrativeAreaLevel2 updated', async () => {
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
          <CommonUpdateAdministrativeAreaLevel2ByIdInput>(
            commonMockAdministrativeAreaLevel2Data[0]
          ),
          {},
          'Europe/Madrid',
        ),
      ).toBe(commonMockAdministrativeAreaLevel2Data[0]);
    });
  });
});
