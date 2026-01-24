import {
  CommonCreateResourcesHandler,
  CommonCreateResourcesResolver,
} from '@api/common/resource';
import { CommonCreateResourceInput } from '@api/graphql';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateResourcesResolver', () => {
  let resolver: CommonCreateResourcesResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateResourcesResolver,
        {
          provide: CommonCreateResourcesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonCreateResourcesResolver>(
      CommonCreateResourcesResolver,
    );
  });

  test('CommonCreateResourcesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonCreateResourcesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an resources created', async () => {
      expect(
        await resolver.main(
          <CommonCreateResourceInput[]>commonMockResourceData,
        ),
      ).toBe(undefined);
    });
  });
});
