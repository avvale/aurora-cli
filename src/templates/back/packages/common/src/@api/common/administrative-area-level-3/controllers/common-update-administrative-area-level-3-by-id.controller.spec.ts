/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import {
  CommonUpdateAdministrativeAreaLevel3ByIdController,
  CommonUpdateAdministrativeAreaLevel3ByIdHandler,
} from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreaLevel3ByIdController', () => {
  let controller: CommonUpdateAdministrativeAreaLevel3ByIdController;
  let handler: CommonUpdateAdministrativeAreaLevel3ByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonUpdateAdministrativeAreaLevel3ByIdController],
      providers: [
        {
          provide: CommonUpdateAdministrativeAreaLevel3ByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonUpdateAdministrativeAreaLevel3ByIdController>(
      CommonUpdateAdministrativeAreaLevel3ByIdController,
    );
    handler = module.get<CommonUpdateAdministrativeAreaLevel3ByIdHandler>(
      CommonUpdateAdministrativeAreaLevel3ByIdHandler,
    );
  });

  describe('main', () => {
    test('CommonUpdateAdministrativeAreaLevel3ByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a administrativeAreaLevel3 updated', async () => {
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
