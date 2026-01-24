import {
  CommonFindAdministrativeAreaLevel1ByIdController,
  CommonFindAdministrativeAreaLevel1ByIdHandler,
} from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel1ByIdController', () => {
  let controller: CommonFindAdministrativeAreaLevel1ByIdController;
  let handler: CommonFindAdministrativeAreaLevel1ByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonFindAdministrativeAreaLevel1ByIdController],
      providers: [
        {
          provide: CommonFindAdministrativeAreaLevel1ByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonFindAdministrativeAreaLevel1ByIdController>(
      CommonFindAdministrativeAreaLevel1ByIdController,
    );
    handler = module.get<CommonFindAdministrativeAreaLevel1ByIdHandler>(
      CommonFindAdministrativeAreaLevel1ByIdHandler,
    );
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel1ByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an administrativeAreaLevel1 by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel1Data[0]),
            ),
        );
      expect(
        await controller.main(commonMockAdministrativeAreaLevel1Data[0].id),
      ).toBe(commonMockAdministrativeAreaLevel1Data[0]);
    });
  });
});
