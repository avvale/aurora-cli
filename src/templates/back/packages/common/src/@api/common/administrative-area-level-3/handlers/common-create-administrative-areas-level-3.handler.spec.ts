import { CommonCreateAdministrativeAreasLevel3Handler } from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreasLevel3Handler', () => {
  let handler: CommonCreateAdministrativeAreasLevel3Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateAdministrativeAreasLevel3Handler,
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

    handler = module.get<CommonCreateAdministrativeAreasLevel3Handler>(
      CommonCreateAdministrativeAreasLevel3Handler,
    );
  });

  describe('main', () => {
    test('CommonCreateAdministrativeAreasLevel3Handler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an commonMockAdministrativeAreaLevel3Data created', async () => {
      expect(await handler.main(commonMockAdministrativeAreaLevel3Data)).toBe(
        true,
      );
    });
  });
});
