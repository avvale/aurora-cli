/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonDeleteAdministrativeAreaLevel1ByIdHandler,
  CommonDeleteAdministrativeAreaLevel1ByIdResolver,
} from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreaLevel1ByIdResolver', () => {
  let resolver: CommonDeleteAdministrativeAreaLevel1ByIdResolver;
  let handler: CommonDeleteAdministrativeAreaLevel1ByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonDeleteAdministrativeAreaLevel1ByIdResolver,
        {
          provide: CommonDeleteAdministrativeAreaLevel1ByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonDeleteAdministrativeAreaLevel1ByIdResolver>(
      CommonDeleteAdministrativeAreaLevel1ByIdResolver,
    );
    handler = module.get<CommonDeleteAdministrativeAreaLevel1ByIdHandler>(
      CommonDeleteAdministrativeAreaLevel1ByIdHandler,
    );
  });

  test('CommonDeleteAdministrativeAreaLevel1ByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonDeleteAdministrativeAreaLevel1ByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an administrativeAreaLevel1 deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel1Data[0]),
            ),
        );
      expect(
        await resolver.main(commonMockAdministrativeAreaLevel1Data[0].id),
      ).toBe(commonMockAdministrativeAreaLevel1Data[0]);
    });
  });
});
