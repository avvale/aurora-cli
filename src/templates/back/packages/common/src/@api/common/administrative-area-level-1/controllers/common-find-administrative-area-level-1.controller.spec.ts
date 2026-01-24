import {
  CommonFindAdministrativeAreaLevel1Controller,
  CommonFindAdministrativeAreaLevel1Handler,
} from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel1Controller', () => {
  let controller: CommonFindAdministrativeAreaLevel1Controller;
  let handler: CommonFindAdministrativeAreaLevel1Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonFindAdministrativeAreaLevel1Controller],
      providers: [
        {
          provide: CommonFindAdministrativeAreaLevel1Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonFindAdministrativeAreaLevel1Controller>(
      CommonFindAdministrativeAreaLevel1Controller,
    );
    handler = module.get<CommonFindAdministrativeAreaLevel1Handler>(
      CommonFindAdministrativeAreaLevel1Handler,
    );
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel1Controller should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a administrativeAreaLevel1', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel1Data[0]),
            ),
        );
      expect(await controller.main()).toBe(
        commonMockAdministrativeAreaLevel1Data[0],
      );
    });
  });
});
