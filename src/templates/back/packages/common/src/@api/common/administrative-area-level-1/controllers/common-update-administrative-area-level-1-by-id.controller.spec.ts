/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonUpdateAdministrativeAreaLevel1ByIdController,
  CommonUpdateAdministrativeAreaLevel1ByIdHandler,
} from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreaLevel1ByIdController', () => {
  let controller: CommonUpdateAdministrativeAreaLevel1ByIdController;
  let handler: CommonUpdateAdministrativeAreaLevel1ByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonUpdateAdministrativeAreaLevel1ByIdController],
      providers: [
        {
          provide: CommonUpdateAdministrativeAreaLevel1ByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonUpdateAdministrativeAreaLevel1ByIdController>(
      CommonUpdateAdministrativeAreaLevel1ByIdController,
    );
    handler = module.get<CommonUpdateAdministrativeAreaLevel1ByIdHandler>(
      CommonUpdateAdministrativeAreaLevel1ByIdHandler,
    );
  });

  describe('main', () => {
    test('CommonUpdateAdministrativeAreaLevel1ByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a administrativeAreaLevel1 updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel1Data[0]),
            ),
        );
      expect(
        await controller.main(commonMockAdministrativeAreaLevel1Data[0]),
      ).toBe(commonMockAdministrativeAreaLevel1Data[0]);
    });
  });
});
