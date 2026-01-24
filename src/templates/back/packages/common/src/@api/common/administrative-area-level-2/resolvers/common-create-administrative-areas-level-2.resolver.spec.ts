import {
  CommonCreateAdministrativeAreasLevel2Handler,
  CommonCreateAdministrativeAreasLevel2Resolver,
} from '@api/common/administrative-area-level-2';
import { CommonCreateAdministrativeAreaLevel2Input } from '@api/graphql';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreasLevel2Resolver', () => {
  let resolver: CommonCreateAdministrativeAreasLevel2Resolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateAdministrativeAreasLevel2Resolver,
        {
          provide: CommonCreateAdministrativeAreasLevel2Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonCreateAdministrativeAreasLevel2Resolver>(
      CommonCreateAdministrativeAreasLevel2Resolver,
    );
  });

  test('CommonCreateAdministrativeAreasLevel2Resolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonCreateAdministrativeAreasLevel2Resolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an administrativeAreasLevel2 created', async () => {
      expect(
        await resolver.main(
          <CommonCreateAdministrativeAreaLevel2Input[]>(
            commonMockAdministrativeAreaLevel2Data
          ),
        ),
      ).toBe(undefined);
    });
  });
});
