/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CommonCreateAdministrativeAreasLevel1Handler } from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreasLevel1Handler', () => {
  let handler: CommonCreateAdministrativeAreasLevel1Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateAdministrativeAreasLevel1Handler,
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

    handler = module.get<CommonCreateAdministrativeAreasLevel1Handler>(
      CommonCreateAdministrativeAreasLevel1Handler,
    );
  });

  describe('main', () => {
    test('CommonCreateAdministrativeAreasLevel1Handler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an commonMockAdministrativeAreaLevel1Data created', async () => {
      expect(await handler.main(commonMockAdministrativeAreaLevel1Data)).toBe(
        true,
      );
    });
  });
});
