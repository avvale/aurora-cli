import {
  CommonCreateAdministrativeAreaLevel1Controller,
  CommonCreateAdministrativeAreaLevel1Handler,
} from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreaLevel1Controller', () => {
  let controller: CommonCreateAdministrativeAreaLevel1Controller;
  let handler: CommonCreateAdministrativeAreaLevel1Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonCreateAdministrativeAreaLevel1Controller],
      providers: [
        {
          provide: CommonCreateAdministrativeAreaLevel1Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonCreateAdministrativeAreaLevel1Controller>(
      CommonCreateAdministrativeAreaLevel1Controller,
    );
    handler = module.get<CommonCreateAdministrativeAreaLevel1Handler>(
      CommonCreateAdministrativeAreaLevel1Handler,
    );
  });

  describe('main', () => {
    test('CommonCreateAdministrativeAreaLevel1Controller should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an administrativeAreaLevel1 created', async () => {
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
