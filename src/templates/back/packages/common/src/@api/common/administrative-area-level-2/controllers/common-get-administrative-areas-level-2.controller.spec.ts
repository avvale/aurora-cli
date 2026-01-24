import {
  CommonGetAdministrativeAreasLevel2Controller,
  CommonGetAdministrativeAreasLevel2Handler,
} from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAdministrativeAreasLevel2Controller', () => {
  let controller: CommonGetAdministrativeAreasLevel2Controller;
  let handler: CommonGetAdministrativeAreasLevel2Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonGetAdministrativeAreasLevel2Controller],
      providers: [
        {
          provide: CommonGetAdministrativeAreasLevel2Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonGetAdministrativeAreasLevel2Controller>(
      CommonGetAdministrativeAreasLevel2Controller,
    );
    handler = module.get<CommonGetAdministrativeAreasLevel2Handler>(
      CommonGetAdministrativeAreasLevel2Handler,
    );
  });

  describe('main', () => {
    test('CommonGetAdministrativeAreasLevel2Controller should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a commonMockAdministrativeAreaLevel2Data', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel2Data),
            ),
        );
      expect(await controller.main()).toBe(
        commonMockAdministrativeAreaLevel2Data,
      );
    });
  });
});
