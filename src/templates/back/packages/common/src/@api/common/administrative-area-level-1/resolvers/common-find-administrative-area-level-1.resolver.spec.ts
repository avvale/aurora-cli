/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonFindAdministrativeAreaLevel1Handler,
  CommonFindAdministrativeAreaLevel1Resolver,
} from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel1Resolver', () => {
  let resolver: CommonFindAdministrativeAreaLevel1Resolver;
  let handler: CommonFindAdministrativeAreaLevel1Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindAdministrativeAreaLevel1Resolver,
        {
          provide: CommonFindAdministrativeAreaLevel1Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonFindAdministrativeAreaLevel1Resolver>(
      CommonFindAdministrativeAreaLevel1Resolver,
    );
    handler = module.get<CommonFindAdministrativeAreaLevel1Handler>(
      CommonFindAdministrativeAreaLevel1Handler,
    );
  });

  test('CommonFindAdministrativeAreaLevel1Resolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel1Resolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a administrativeAreaLevel1', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel1Data[0]),
            ),
        );
      expect(await resolver.main()).toBe(
        commonMockAdministrativeAreaLevel1Data[0],
      );
    });
  });
});
