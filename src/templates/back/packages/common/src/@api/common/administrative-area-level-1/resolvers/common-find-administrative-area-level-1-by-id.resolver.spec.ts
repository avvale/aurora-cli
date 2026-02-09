/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonFindAdministrativeAreaLevel1ByIdHandler,
  CommonFindAdministrativeAreaLevel1ByIdResolver,
} from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel1ByIdResolver', () => {
  let resolver: CommonFindAdministrativeAreaLevel1ByIdResolver;
  let handler: CommonFindAdministrativeAreaLevel1ByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindAdministrativeAreaLevel1ByIdResolver,
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

    resolver = module.get<CommonFindAdministrativeAreaLevel1ByIdResolver>(
      CommonFindAdministrativeAreaLevel1ByIdResolver,
    );
    handler = module.get<CommonFindAdministrativeAreaLevel1ByIdHandler>(
      CommonFindAdministrativeAreaLevel1ByIdHandler,
    );
  });

  test('CommonFindAdministrativeAreaLevel1ByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel1ByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
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
        await resolver.main(commonMockAdministrativeAreaLevel1Data[0].id),
      ).toBe(commonMockAdministrativeAreaLevel1Data[0]);
    });
  });
});
