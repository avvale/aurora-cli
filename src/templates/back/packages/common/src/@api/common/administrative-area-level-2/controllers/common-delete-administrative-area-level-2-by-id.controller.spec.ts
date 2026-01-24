/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonDeleteAdministrativeAreaLevel2ByIdController,
  CommonDeleteAdministrativeAreaLevel2ByIdHandler,
} from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreaLevel2ByIdController', () => {
  let controller: CommonDeleteAdministrativeAreaLevel2ByIdController;
  let handler: CommonDeleteAdministrativeAreaLevel2ByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonDeleteAdministrativeAreaLevel2ByIdController],
      providers: [
        {
          provide: CommonDeleteAdministrativeAreaLevel2ByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonDeleteAdministrativeAreaLevel2ByIdController>(
      CommonDeleteAdministrativeAreaLevel2ByIdController,
    );
    handler = module.get<CommonDeleteAdministrativeAreaLevel2ByIdHandler>(
      CommonDeleteAdministrativeAreaLevel2ByIdHandler,
    );
  });

  describe('main', () => {
    test('CommonDeleteAdministrativeAreaLevel2ByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an administrativeAreaLevel2 deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel2Data[0]),
            ),
        );
      expect(
        await controller.main(commonMockAdministrativeAreaLevel2Data[0].id),
      ).toBe(commonMockAdministrativeAreaLevel2Data[0]);
    });
  });
});
