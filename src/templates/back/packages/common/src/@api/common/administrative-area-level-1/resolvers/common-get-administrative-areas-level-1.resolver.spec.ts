/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonGetAdministrativeAreasLevel1Handler,
  CommonGetAdministrativeAreasLevel1Resolver,
} from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAdministrativeAreasLevel1Resolver', () => {
  let resolver: CommonGetAdministrativeAreasLevel1Resolver;
  let handler: CommonGetAdministrativeAreasLevel1Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonGetAdministrativeAreasLevel1Resolver,
        {
          provide: CommonGetAdministrativeAreasLevel1Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonGetAdministrativeAreasLevel1Resolver>(
      CommonGetAdministrativeAreasLevel1Resolver,
    );
    handler = module.get<CommonGetAdministrativeAreasLevel1Handler>(
      CommonGetAdministrativeAreasLevel1Handler,
    );
  });

  test('CommonGetAdministrativeAreasLevel1Resolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonGetAdministrativeAreasLevel1Resolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a commonMockAdministrativeAreaLevel1Data', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel1Data),
            ),
        );
      expect(await resolver.main()).toBe(
        commonMockAdministrativeAreaLevel1Data,
      );
    });
  });
});
