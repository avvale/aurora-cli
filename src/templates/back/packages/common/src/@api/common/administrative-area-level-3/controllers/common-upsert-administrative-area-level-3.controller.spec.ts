import {
  CommonUpsertAdministrativeAreaLevel3Controller,
  CommonUpsertAdministrativeAreaLevel3Handler,
} from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAdministrativeAreaLevel3Controller', () => {
  let controller: CommonUpsertAdministrativeAreaLevel3Controller;
  let handler: CommonUpsertAdministrativeAreaLevel3Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonUpsertAdministrativeAreaLevel3Controller],
      providers: [
        {
          provide: CommonUpsertAdministrativeAreaLevel3Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonUpsertAdministrativeAreaLevel3Controller>(
      CommonUpsertAdministrativeAreaLevel3Controller,
    );
    handler = module.get<CommonUpsertAdministrativeAreaLevel3Handler>(
      CommonUpsertAdministrativeAreaLevel3Handler,
    );
  });

  describe('main', () => {
    test('CommonUpsertAdministrativeAreaLevel3Controller should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an administrativeAreaLevel3 upserted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel3Data[0]),
            ),
        );
      expect(
        await controller.main(commonMockAdministrativeAreaLevel3Data[0]),
      ).toBe(commonMockAdministrativeAreaLevel3Data[0]);
    });
  });
});
