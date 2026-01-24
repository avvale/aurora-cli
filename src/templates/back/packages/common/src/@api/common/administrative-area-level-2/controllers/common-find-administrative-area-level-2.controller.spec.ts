import {
  CommonFindAdministrativeAreaLevel2Controller,
  CommonFindAdministrativeAreaLevel2Handler,
} from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel2Controller', () => {
  let controller: CommonFindAdministrativeAreaLevel2Controller;
  let handler: CommonFindAdministrativeAreaLevel2Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonFindAdministrativeAreaLevel2Controller],
      providers: [
        {
          provide: CommonFindAdministrativeAreaLevel2Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonFindAdministrativeAreaLevel2Controller>(
      CommonFindAdministrativeAreaLevel2Controller,
    );
    handler = module.get<CommonFindAdministrativeAreaLevel2Handler>(
      CommonFindAdministrativeAreaLevel2Handler,
    );
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel2Controller should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a administrativeAreaLevel2', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel2Data[0]),
            ),
        );
      expect(await controller.main()).toBe(
        commonMockAdministrativeAreaLevel2Data[0],
      );
    });
  });
});
