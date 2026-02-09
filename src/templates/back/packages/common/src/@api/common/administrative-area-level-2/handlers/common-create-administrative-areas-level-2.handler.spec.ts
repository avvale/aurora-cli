/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CommonCreateAdministrativeAreasLevel2Handler } from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreasLevel2Handler', () => {
  let handler: CommonCreateAdministrativeAreasLevel2Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateAdministrativeAreasLevel2Handler,
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

    handler = module.get<CommonCreateAdministrativeAreasLevel2Handler>(
      CommonCreateAdministrativeAreasLevel2Handler,
    );
  });

  describe('main', () => {
    test('CommonCreateAdministrativeAreasLevel2Handler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an commonMockAdministrativeAreaLevel2Data created', async () => {
      expect(await handler.main(commonMockAdministrativeAreaLevel2Data)).toBe(
        true,
      );
    });
  });
});
