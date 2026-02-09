/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import {
  CommonFindAdministrativeAreaLevel3Controller,
  CommonFindAdministrativeAreaLevel3Handler,
} from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel3Controller', () => {
  let controller: CommonFindAdministrativeAreaLevel3Controller;
  let handler: CommonFindAdministrativeAreaLevel3Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonFindAdministrativeAreaLevel3Controller],
      providers: [
        {
          provide: CommonFindAdministrativeAreaLevel3Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonFindAdministrativeAreaLevel3Controller>(
      CommonFindAdministrativeAreaLevel3Controller,
    );
    handler = module.get<CommonFindAdministrativeAreaLevel3Handler>(
      CommonFindAdministrativeAreaLevel3Handler,
    );
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel3Controller should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a administrativeAreaLevel3', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel3Data[0]),
            ),
        );
      expect(await controller.main()).toBe(
        commonMockAdministrativeAreaLevel3Data[0],
      );
    });
  });
});
