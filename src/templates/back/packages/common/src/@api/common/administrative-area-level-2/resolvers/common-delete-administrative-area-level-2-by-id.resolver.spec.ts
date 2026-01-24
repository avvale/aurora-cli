/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonDeleteAdministrativeAreaLevel2ByIdHandler,
  CommonDeleteAdministrativeAreaLevel2ByIdResolver,
} from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreaLevel2ByIdResolver', () => {
  let resolver: CommonDeleteAdministrativeAreaLevel2ByIdResolver;
  let handler: CommonDeleteAdministrativeAreaLevel2ByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonDeleteAdministrativeAreaLevel2ByIdResolver,
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

    resolver = module.get<CommonDeleteAdministrativeAreaLevel2ByIdResolver>(
      CommonDeleteAdministrativeAreaLevel2ByIdResolver,
    );
    handler = module.get<CommonDeleteAdministrativeAreaLevel2ByIdHandler>(
      CommonDeleteAdministrativeAreaLevel2ByIdHandler,
    );
  });

  test('CommonDeleteAdministrativeAreaLevel2ByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonDeleteAdministrativeAreaLevel2ByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
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
        await resolver.main(commonMockAdministrativeAreaLevel2Data[0].id),
      ).toBe(commonMockAdministrativeAreaLevel2Data[0]);
    });
  });
});
