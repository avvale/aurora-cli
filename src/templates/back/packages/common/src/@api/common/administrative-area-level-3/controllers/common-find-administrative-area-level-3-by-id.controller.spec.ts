import {
  CommonFindAdministrativeAreaLevel3ByIdController,
  CommonFindAdministrativeAreaLevel3ByIdHandler,
} from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel3ByIdController', () => {
  let controller: CommonFindAdministrativeAreaLevel3ByIdController;
  let handler: CommonFindAdministrativeAreaLevel3ByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonFindAdministrativeAreaLevel3ByIdController],
      providers: [
        {
          provide: CommonFindAdministrativeAreaLevel3ByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonFindAdministrativeAreaLevel3ByIdController>(
      CommonFindAdministrativeAreaLevel3ByIdController,
    );
    handler = module.get<CommonFindAdministrativeAreaLevel3ByIdHandler>(
      CommonFindAdministrativeAreaLevel3ByIdHandler,
    );
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel3ByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an administrativeAreaLevel3 by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel3Data[0]),
            ),
        );
      expect(
        await controller.main(commonMockAdministrativeAreaLevel3Data[0].id),
      ).toBe(commonMockAdministrativeAreaLevel3Data[0]);
    });
  });
});
