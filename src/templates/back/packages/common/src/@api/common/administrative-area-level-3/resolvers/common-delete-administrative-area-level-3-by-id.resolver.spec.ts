/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonDeleteAdministrativeAreaLevel3ByIdHandler,
  CommonDeleteAdministrativeAreaLevel3ByIdResolver,
} from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreaLevel3ByIdResolver', () => {
  let resolver: CommonDeleteAdministrativeAreaLevel3ByIdResolver;
  let handler: CommonDeleteAdministrativeAreaLevel3ByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonDeleteAdministrativeAreaLevel3ByIdResolver,
        {
          provide: CommonDeleteAdministrativeAreaLevel3ByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonDeleteAdministrativeAreaLevel3ByIdResolver>(
      CommonDeleteAdministrativeAreaLevel3ByIdResolver,
    );
    handler = module.get<CommonDeleteAdministrativeAreaLevel3ByIdHandler>(
      CommonDeleteAdministrativeAreaLevel3ByIdHandler,
    );
  });

  test('CommonDeleteAdministrativeAreaLevel3ByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonDeleteAdministrativeAreaLevel3ByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an administrativeAreaLevel3 deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel3Data[0]),
            ),
        );
      expect(
        await resolver.main(commonMockAdministrativeAreaLevel3Data[0].id),
      ).toBe(commonMockAdministrativeAreaLevel3Data[0]);
    });
  });
});
